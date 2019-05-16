import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef
} from "@angular/core";
import { Observable, of, fromEvent, combineLatest, Subscription } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  mergeMap
} from "rxjs/operators";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { TableMetadata, ColumnMetadata, DataType } from "./models/metadata";
import { TableConfig } from "./models/table-config";
import {
  CdkDragStart,
  CdkDropList,
  moveItemInArray
} from "@angular/cdk/drag-drop";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "inevitable",
  templateUrl: "./inevitable.component.html",
  styles: ["./inevitable.component.scss"]
})
export class InevitableComponent implements AfterViewInit, OnDestroy, OnInit {
  constructor() {}

  /*
  The data, which can be either an array of objects, or an observable containing such an array
  */
  @Input()
  data: any[] | Observable<any[]>;

  /*
  The metadata object containing data about the table itself and the details of the columns present
  */
  @Input()
  metadata: TableMetadata;

  @Input()
  config: TableConfig = {};

  /*
  Event emitters for select (multi-select), hover and click events
  */
  @Output()
  select: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  hover: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  click: EventEmitter<any> = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>([]);

  // previous column index for drag n drop
  previous: number;

  // default sorting
  matSortActive: string;
  matSortDirection: string;

  // all metadata validation checks passed
  public valid = false;

  public globalFilter: string;
  public globalFilterLabel: string;

  // all the filter functions to apply to the data
  // this will contain the global filter function as well as any column-based filters
  // public filters: Observable<(data: any) => boolean> = new Observable();
  // public globalFilterObservable = new Observable();

  @ViewChild("globalFilterInput")
  public globalFilterInput: ElementRef;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  subscription: Subscription;

  ngAfterViewInit(): void {
    const globalFilterInputChanges = fromEvent<any>(
      this.globalFilterInput.nativeElement,
      "keyup"
    ).pipe(
      map(event => event.target.value),
      startWith(""),
      debounceTime(400),
      distinctUntilChanged()
    );
    const keyList: string = this.getKeyColumnNames().join(" ") || "none";

    this.valid = this.validateMetadata().length === 0;

    if (this.validateMetadata().length > 0) {
      this.log(
        `The following metadata validation errors occurred: ${this.validateMetadata().join(
          ", "
        )}`,
        "error"
      );
    }

    this.matSortActive = this.metadata.defaultSortColumn;
    this.matSortDirection = this.metadata.defaultSortColumnDirection;

    // if the data was supplied as an array wrap it in an observable
    let inputDataObservable: Observable<any>;

    if (Array.isArray(this.data)) {
      this.log(`Data type is Array. Key columns: ${keyList}`);

      inputDataObservable = of(this.data);
    }

    if (this.data instanceof Observable) {
      inputDataObservable = this.data;

      this.log(`Data type is Observable. Key columns: ${keyList}`);
    }

    this.subscription = combineLatest(
      inputDataObservable,
      globalFilterInputChanges
    ).subscribe(([latestData, latestGlobalFilter]) => {
      if (latestGlobalFilter.length > 0) {
        let filterableColumns = [];
        this.metadata.columns.forEach((col, index) => {
          if (col.includeInGlobalFilter) {
            filterableColumns.push(index);
          }
        });

        latestData = latestData.filter(row =>
          // only apply global filter to those columns
          // which are set accordingly in the metadata

          Object.values(row).some(
            (value: any, index) =>
              filterableColumns.includes(index) &&
              typeof value === "string" &&
              value.toLowerCase().includes(latestGlobalFilter.toLowerCase())
          )
        );
      }

      this.dataSource = new MatTableDataSource(latestData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.log(`events subscribed to: ${this.getFeatures().join(" ") || "none"}`);

    this.log(`config: ${JSON.stringify(this.config)}`);

    if (this.config.showGlobalFilter) {
      if (
        this.getColumns().some(
          (column: ColumnMetadata) => column.includeInGlobalFilter
        )
      ) {
        this.globalFilterLabel =
          "filter by " +
          this.getColumns()
            .filter((column: ColumnMetadata) => column.includeInGlobalFilter)
            .map((column: ColumnMetadata) => column.displayName)
            .join(", ");
      } else {
        this.globalFilterLabel = "filter by anything...";
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /*
  Return details about the columns in the data. Either from the columns metadata array, or derived automatically
  if this is not supplied
  */
  getColumns() {
    if (this.metadata.columns.length > 0) {
      return this.metadata.columns;
    }

    if (Array.isArray(this.data)) {
      return this.data[0].keys().forEach((key: string) => {
        let column = new ColumnMetadata();
        column = {
          name: key,
          displayName: key,
          dataType: DataType.String
        };
        return column;
      });
    }
  }

  /*
  Functions to get the array of display names and column names (i.e. keys)
  */
  getDisplayColumns = () =>
    this.getColumns().map((col: ColumnMetadata) => col.displayName);
  getColumnNames = () =>
    this.getColumns().map((col: ColumnMetadata) => col.name);
  getKeyColumnNames = () =>
    this.metadata.columns
      .filter((c: ColumnMetadata) => c.isKey)
      .map((c: ColumnMetadata) => c.name);

  // globalFilterKeyup($event) {
  //   this.log(`keyup ${$event.target.value}`);

  //   // set the global filter to a function which returns only rows which
  //   // have a value in at least one of the rows values
  //   this.filters[0] =
  //     (row: any) => Object.values(row)
  //                   .some((value: any) => value.includes($event.target.value));

  //   this.globalFilterObservable.;
  // }

  /*
  Apply all of the filters to the incoming data (array)
  */
  // applyFilters(data: any[]): any[] {
  //   //
  //   let filteredData = data;

  //   this.filters.forEach((filter) => filteredData = filteredData.filter(filter));

  //   return filteredData;
  // }

  /*
  Validation
  */
  validateMetadata(): string[] {
    const errors = [];

    const isDataModificationColumns = this.metadata.columns.filter(
      (c: ColumnMetadata) => c.isDataModification
    );
    if (isDataModificationColumns.length > 1) {
      errors.push(`The following columns are configured with isDataModification:
      ${isDataModificationColumns.join(" ")}. You must select at most one`);
    }
    return errors;
  }

  /*
  Functions relating to which features are selected
  */
  isEnabled = (feature: string) => this[feature].observers.length > 0;
  getFeatures = () =>
    ["select", "click", "hover"].filter((feature: string) =>
      this.isEnabled(feature)
    );

  /*
  Event emitters
  */
  emitClickEvent = ($event: any) => this.click.emit($event);
  emitHoverEvent = ($event: any) => this.hover.emit($event);

  /*
  Drag n Drop related functions
  */
  dragStarted = (event: CdkDragStart, index: number) => (this.previous = index);

  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.metadata.columns, this.previous, index);
    }
  }

  /*
  Generic logging function
  */
  log = (message: string, severity: string = "log") =>
    console[severity](`[inevitable] (${this.metadata.name}) ${message}`);
}
