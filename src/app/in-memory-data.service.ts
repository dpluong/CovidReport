import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CovidCase } from "./CovidCase";
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const covidCases = [
      { id: 1,
        location: "Burnaby, BC, Canada",
        lat: 49.2488091,
        lng: -122.9805104,
        phoneNum: "0123456789",
        personReported: "Peter",
        date: "10/04/2021",
        extra: "alive"
      },
      {
        id: 2,
        location: "Vancouver, BC, Canada",
        lat: 49.2827291,
        lng: -123.1207375,
        phoneNum: "0123456788",
        personReported: "Alex",
        date: "11/04/2021",
        extra: "alive"
      },
      {
        id: 3,
        location: "Surrey, BC, Canada",
        lat: 49.1913466,
        lng: -122.8490125,
        phoneNum: "0123456787",
        personReported: "Lisa",
        date: "12/04/2021",
        extra: "alive"
      }
    ];
    return {covidCases};
  }
  genId(cases: CovidCase[]): number {
    return cases.length > 0 ? Math.max(...cases.map(hero => hero.id)) + 1 : 1;
  }
}
