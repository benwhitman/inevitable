import { Component, OnInit } from '@angular/core';
import { IceCream } from '../models/ice-cream';

import { TableMetadata, DataType } from 'inevitable';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {

  public myData: IceCream[] = [
    {
      id: 1, flavour: 'chocolate', calories: 200, price: 3.50
    },
    {
      id: 2, flavour: 'vanilla', calories: 150, price: 4.25
    },
  ];

  public myMetadata: TableMetadata = {
    name: 'ice-cream',
    heading: 'Simple Table',
    subHeading: 'Table data is just a plain array',
    pagination: [10, 20, 40],
    columns: [
      {
        name: 'id',
        displayName: 'ID',
        allowSort: false,
        dataType: DataType.Int,
      },
      {
        name: 'flavour',
        displayName: 'Flavour',
        includeInGlobalFilter: true,
        allowSort: true,
        dataType: DataType.String,
      },
      {
        name: 'calories',
        displayName: 'Kcal',
        includeInGlobalFilter: false,
        allowSort: true,
        dataType: DataType.Int,
      },
      {
        name: 'price',
        displayName: 'Price (£)',
        includeInGlobalFilter: false,
        allowSort: true,
        dataType: DataType.Currency,
        currencyCode: 'GBP'
      },
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
