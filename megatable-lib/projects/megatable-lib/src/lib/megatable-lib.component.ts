import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TableMetadata, ColumnMetadata, DataType } from './models/metadata';
import { TableConfig } from './models/table-config';

@Component({
  selector: 'megatable-table',
  templateUrl: './megatable-lib.component.html',
  styles: ['./megatable-lib.component.scss']
})
export class MegatableLibComponent implements OnInit {

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

  constructor() {

  }


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

    this.log(`events subscribed to: ${this.select.observers.length > 0 ? 'select ' : ''}` +
              `${this.click.observers.length > 0 ? 'click ' : ''}` +
              `${this.hover.observers.length > 0 ? 'hover ' : ''}` +
              `${this.select.observers.length + this.click.observers.length + this.hover.observers.length === 0 ? 'none' : ''}`);


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

  getDisplayColumns() {
    return this.getColumns().map((col: ColumnMetadata) => col.displayName);
  }

  getColumnNames() {
    return this.getColumns().map((col: ColumnMetadata) => col.name);
  }

  /*
  Functions to establish whether various bits of functionality are enabled
  */
  getMultiSelectEnabled() {
    return this.select.observers.length > 0;
  }

  getHoverEnabled() {
    return this.hover.observers.length > 0;
  }

  getClickEnabled() {
    return this.click.observers.length > 0;
  }

  /*
  Event emitters
  */
  emitClickEvent($event) {
    this.click.emit($event);
  }

  emitHoverEvent($event) {
    this.hover.emit($event);
  }

  /*
  Generic logging function
  */
  log(message: string) {
    console.log(`[MEGA] (${this.metadata.name}) ${message}`);
  }

}
