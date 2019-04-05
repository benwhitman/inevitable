import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'megatable-table',
  templateUrl: './megatable-lib.component.html',
  styles: ['./megatable-lib.component.scss']
})
export class MegatableLibComponent implements OnInit {

  @Input()
  data: any[] | Observable<any[]>;

  @Input()
  name: string;

  cols = [{ name: 'col1', displayName: 'Column 1' }, { name: 'col2', displayName: 'Column 2'}];

  dataSource = new MatTableDataSource<any>([
    { col1: 'ABC', col2: '123' },
    { col1: 'DEF', col2: '456' },
  ]);

  constructor() {

  }

  ngOnInit() {
    if (Array.isArray(this.data)) {
      this.log('data type is array');
    }

    if (this.data instanceof Observable) {
      this.log('data type is observable');
    }
  }

  getColumns() {
    return this.cols;
  }

  getDisplayColumns() {
    return this.getColumns().map((col) => col.name);
  }

  log(message: string) {
    console.log(`[MEGA] (${this.name}) ${message}`);
  }

}
