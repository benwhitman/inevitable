import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'megatable-table',
  templateUrl: './megatable-lib.component.html',
  styles: ['./megatable-lib.component.scss']
})
export class MegatableLibComponent implements OnInit {

  @Input()
  data: any[] | Observable<any[]>;

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

  log(message: string) {
    console.log(`[MEGA] ${message}`);
  }

}
