import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TableMetadata, ColumnMetadata, DataType } from './models/metadata';
import { TableConfig } from './models/table-config';
import { CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'megatable-table',
  templateUrl: './megatable-lib.component.html',
  styles: ['./megatable-lib.component.scss']
})
export class MegatableLibComponent implements OnInit {

  constructor() { }

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
  config: TableConfig;

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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    const keyList: string = this.getKeyColumnNames().join(' ') || 'none';

    this.valid = this.validateMetadata().length === 0;

    if (this.validateMetadata().length > 0) {
      this.log(`The following metadata validation errors occurred: ${this.validateMetadata().join(', ')}`, 'error');
    }

    this.matSortActive = this.metadata.defaultSortColumn;
    this.matSortDirection = this.metadata.defaultSortColumnDirection;

    if (Array.isArray(this.data)) {

      this.log(`Data type is Array. Key columns: ${keyList}`);

      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

    if (this.data instanceof Observable) {
      this.log(`Data type is Observable. Key columns: ${keyList}`);

      this.data.subscribe((newData: any[]) => {
        this.dataSource = new MatTableDataSource(newData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }

    this.log(`events subscribed to: ${this.getFeatures().join(' ') || 'none'}`);
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
  getDisplayColumns = () => this.getColumns().map((col: ColumnMetadata) => col.displayName);
  getColumnNames = () => this.getColumns().map((col: ColumnMetadata) => col.name);
  getKeyColumnNames = () => this.metadata.columns
                                  .filter((c: ColumnMetadata) => c.isKey)
                                  .map((c: ColumnMetadata) => c.name)

  /*
  Validation
  */
  validateMetadata(): string[] {
    const errors = [];

    const isDataModificationColumns = this.metadata.columns.filter((c: ColumnMetadata) => c.isDataModification);
    if (isDataModificationColumns.length > 1) {
      errors.push(`The following columns are configured with isDataModification:
      ${isDataModificationColumns.join(' ')}. You must select at most one`);
    }
    return errors;
  }

  /*
  Functions relating to which features are selected
  */
  isEnabled = (feature: string) => this[feature].observers.length > 0;
  getFeatures = () => ['select', 'click', 'hover'].filter((feature: string) => this.isEnabled(feature));

  /*
  Event emitters
  */
  emitClickEvent = ($event: any) => this.click.emit($event);
  emitHoverEvent = ($event: any) => this.hover.emit($event);

  /*
  Drag n Drop related functions
  */
  dragStarted = (event: CdkDragStart, index: number) => this.previous = index;

  dropListDropped(event: CdkDropList, index: number) {
    if (event) {
      moveItemInArray(this.metadata.columns, this.previous, index);
    }
  }

  /*
  Generic logging function
  */
  log = (message: string, severity: string = 'log') => console[severity](`[MEGA] (${this.metadata.name}) ${message}`);
}
