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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    if (Array.isArray(this.data)) {
      this.log('data type is array');

      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

    if (this.data instanceof Observable) {
      this.log('data type is observable');
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
  log = (message: string) => console.log(`[MEGA] (${this.metadata.name}) ${message}`);
}
