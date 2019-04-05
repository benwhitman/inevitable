import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { TableMetadata, ColumnMetadata } from './models/metadata';

@Component({
  selector: 'megatable-table',
  templateUrl: './megatable-lib.component.html',
  styles: ['./megatable-lib.component.scss']
})
export class MegatableLibComponent implements OnInit {

  @Input()
  data: any[] | Observable<any[]>;

  @Input()
  metadata: TableMetadata;

  dataSource = new MatTableDataSource<any>([]);

  constructor() {

  }

  ngOnInit() {
    if (Array.isArray(this.data)) {
      this.log('data type is array');

      this.dataSource = new MatTableDataSource(this.data);
    }

    if (this.data instanceof Observable) {
      this.log('data type is observable');
      this.data.subscribe((newData: any[]) => {
        this.dataSource = new MatTableDataSource(newData);
      });
    }


  }

  getColumns() {
    return this.metadata.columns;
  }

  getDisplayColumns() {
    return this.getColumns().map((col: ColumnMetadata) => col.displayName);
  }

  getColumnNames() {
    return this.getColumns().map((col: ColumnMetadata) => col.name);
  }

  log(message: string) {
    console.log(`[MEGA] (${this.metadata.name}) ${message}`);
  }

}
