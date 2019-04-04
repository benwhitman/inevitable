import { Component, OnInit } from '@angular/core';
import { IceCream } from '../models/ice-cream';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

  public myData: IceCream[] = [
    {
      id: 1, flavour: 'chocolate', calories: 200
    },
    {
      id: 2, flavour: 'vanilla', calories: 150
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
