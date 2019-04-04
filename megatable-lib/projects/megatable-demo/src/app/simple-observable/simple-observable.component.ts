import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RaceCar } from '../models/race-car';

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
    }
  ]);

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      const positions = this.myObservable.getValue().map((r: RaceCar) => r.racePosition);
      const newPositions = positions.sort(() => Math.random() - 0.5);

      const newData: RaceCar[] = this.myObservable.getValue();
      newPositions.forEach((np, i) => newData[i].racePosition = np);

      newData.forEach((r: RaceCar) => {
        if (r.remainingFuel === 0) {
          r.pitstop = true;
        }

        if (r.pitstop && r.remainingFuel < 100) {
          r.remainingFuel += 20;
        }

        if (r.pitstop && r.remainingFuel === 100) {
          r.pitstop = false;
        }
      });

      this.myObservable.next(newData);
    }, 1000);
  }

}
