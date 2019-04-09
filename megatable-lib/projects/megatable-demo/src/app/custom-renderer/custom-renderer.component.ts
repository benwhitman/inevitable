import { Component, OnInit } from '@angular/core';
import { IceCream } from '../models/ice-cream';

import { TableMetadata, DataType } from 'megatable-lib';

@Component({
  selector: 'app-custom-renderer',
  templateUrl: './custom-renderer.component.html',
  styleUrls: ['./custom-renderer.component.css']
})
export class CustomRendererComponent implements OnInit {

  public myData: IceCream[] = [
    {
      id: 1, flavour: 'chocolate', calories: 200, price: 3.50
    },
    {
      id: 2, flavour: 'vanilla', calories: 150, price: 4.25
    },
  ];

  public myMetadata: TableMetadata = {
    name: 'custom-renderer',
    heading: 'Custom Renderer',
    subHeading: 'Here we are showing a random image from Flickr',
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
        renderer: this.randomImage
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

  randomImage(cellData: IceCream) {
    return `<b>${cellData.flavour}</b><br/><img src="https://loremflickr.com/320/240" />`;
  }

}
