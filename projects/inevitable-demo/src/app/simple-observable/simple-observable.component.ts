import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RaceCar } from '../models/race-car';
import { DataType, TableMetadata } from 'inevitable';

@Component({
  selector: 'app-simple-observable',
  templateUrl: './simple-observable.component.html',
  styleUrls: ['./simple-observable.component.css']
})
export class SimpleObservableComponent implements OnInit {

  public myObservable: BehaviorSubject<RaceCar[]> = new BehaviorSubject<RaceCar[]>([
    {
      driver: 'Rads Mikkelson',
      racePosition: 1,
      remainingFuel: 100,
      pitstop: false
    },
    {
      driver: 'Chris Dunkelpump',
      racePosition: 2,
      remainingFuel: 100,
      pitstop: false
    },
    {
      driver: 'Lewis Fabilton',
      racePosition: 3,
      remainingFuel: 100,
      pitstop: false
    }
  ]);

  public myMetadata: TableMetadata = {
    name: 'formula-27',
    heading: 'Simple Table from Observable (BehaviorSubject)',
    subHeading: 'Each observation refreshes the whole table',
    pagination: [10, 20, 40],
    defaultSortColumn: 'racePosition',
    defaultSortColumnDirection: 'asc',
    columns: [
      {
        name: 'driver',
        displayName: 'Driver',
        allowSort: false,
        dataType: DataType.String,
      },
      {
        name: 'racePosition',
        displayName: 'Position',
        includeInGlobalFilter: false,
        allowSort: true,
        dataType: DataType.Int,
      },
      {
        name: 'remainingFuel',
        displayName: 'Fuel',
        includeInGlobalFilter: false,
        allowSort: true,
        dataType: DataType.Int,
      },
      {
        name: 'pitstop',
        displayName: 'In the pits?',
        includeInGlobalFilter: false,
        allowSort: true,
        dataType: DataType.Boolean,
      },
    ]
  };

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      const positions = this.myObservable.getValue().map((r: RaceCar) => r.racePosition);
      const newPositions = positions.sort(() => Math.random() - 0.5);

      const newData: RaceCar[] = this.myObservable.getValue();
      newPositions.forEach((np, i) => newData[i].racePosition = np);

      newData.forEach((r: RaceCar) => {

        if (r.pitstop && r.remainingFuel < 100) {
          r.remainingFuel += 20;
        }

        if (r.pitstop && r.remainingFuel === 100) {
          r.pitstop = false;
        }

        if (!r.pitstop) {
          r.remainingFuel -= 10 * Math.floor(5 * Math.random());
          if (r.remainingFuel < 0) {
            r.remainingFuel = 0;
          }
        }

        if (r.remainingFuel === 0) {
          r.pitstop = true;
        }
      });

      this.myObservable.next(newData);
    }, 1000);
  }

}
