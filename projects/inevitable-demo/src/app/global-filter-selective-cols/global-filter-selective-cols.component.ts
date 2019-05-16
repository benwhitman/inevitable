import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { RaceCar } from "../models/race-car";
import { DataType, TableMetadata, TableConfig } from "inevitable";

@Component({
  selector: "app-global-filter-selective-cols",
  template: `
    <inevitable
      name="Global Filter"
      [data]="myObservable"
      [metadata]="myMetadata"
      [config]="config"
    >
    </inevitable>
  `
})
export class GlobalFilterSelectiveColsComponent implements OnInit {
  public myObservable: BehaviorSubject<RaceCar[]> = new BehaviorSubject<
    RaceCar[]
  >([
    {
      driver: "Rads Mikkelson",
      nationality: "Finland",
      racePosition: 1,
      remainingFuel: 100,
      pitstop: false
    },
    {
      driver: "Chris Dunkelpump",
      nationality: "Germany",
      racePosition: 2,
      remainingFuel: 100,
      pitstop: false
    },
    {
      driver: "Lewis Fabilton",
      nationality: "United Kingdom",
      racePosition: 3,
      remainingFuel: 100,
      pitstop: false
    }
  ]);

  public myMetadata: TableMetadata = {
    name: "formula-27",
    heading: "Global filter with selective cols (config.showGlobalFilter)",
    subHeading:
      "set includeInGlobalFilter = true on specific columns to filter what the filter filters",
    pagination: [10, 20, 40],
    defaultSortColumn: "racePosition",
    defaultSortColumnDirection: "asc",
    columns: [
      {
        name: "driver",
        displayName: "Driver",
        includeInGlobalFilter: true,
        allowSort: false,
        dataType: DataType.String
      },
      {
        name: "nationality",
        displayName: "Nationality",
        includeInGlobalFilter: true,
        allowSort: false,
        dataType: DataType.String
      },
      {
        name: "racePosition",
        displayName: "Position",
        includeInGlobalFilter: false,
        allowSort: true,
        dataType: DataType.Int
      },
      {
        name: "remainingFuel",
        displayName: "Fuel",
        includeInGlobalFilter: false,
        allowSort: true,
        dataType: DataType.Int
      },
      {
        name: "pitstop",
        displayName: "In the pits?",
        includeInGlobalFilter: false,
        allowSort: true,
        dataType: DataType.Boolean
      }
    ]
  };

  public config: TableConfig = {
    showGlobalFilter: true
  };

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      const positions = this.myObservable
        .getValue()
        .map((r: RaceCar) => r.racePosition);
      const newPositions = positions.sort(() => Math.random() - 0.5);

      const newData: RaceCar[] = this.myObservable.getValue();
      newPositions.forEach((np, i) => (newData[i].racePosition = np));

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
