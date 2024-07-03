/// <reference types="@types/googlemaps" />
import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { CovidCaseService } from "../covid-case.service";
import { CovidCase, CaseInLocation } from "../CovidCase";
@Component({
  selector: 'app-covidmap',
  templateUrl: './covidmap.component.html',
  styleUrls: ['./covidmap.component.css']
})

export class CovidmapComponent implements AfterViewInit {
  covidCases: CovidCase[] = [];
  caseInLocation: CaseInLocation[] = [];
  title = 'gmapsDemo';
  
  @ViewChild('gmap') gmapElement;
  map: google.maps.Map;
  constructor(private covidCaseService: CovidCaseService) {

  }
  ngAfterViewInit() {
    let mapProp = {
      center: new google.maps.LatLng(49.2, -123),
      zoom: 10,
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    
    this.initRender();
  }
  initRender(): void {
    this.covidCaseService.getCovidCases()
    .subscribe(covidCases => {
      this.covidCases = covidCases;
      for (let i = 0; i < this.covidCases.length; ++i) {
        let currentCase: CaseInLocation;
        let caseRepeated: number = 0;
        for (let j = 0; j < this.covidCases.length; ++j) {
          if (this.covidCases[i].lat === this.covidCases[j].lat && this.covidCases[i].lng === this.covidCases[j].lng) {
            caseRepeated += 1;
          }
        }
        currentCase = {
          location: this.covidCases[i].location,
          lat: this.covidCases[i].lat,
          lng: this.covidCases[i].lng,
          caseNum: caseRepeated
        }
        this.caseInLocation.push(currentCase);
      }
      for (let i = 0; i < this.caseInLocation.length; ++i) {
        let marker = new google.maps.Marker({
          position: { lat: this.caseInLocation[i].lat, lng: this.caseInLocation[i].lng },
          map: this.map,
          title: `${this.caseInLocation[i].location}
          Number of Cases: ${this.caseInLocation[i].caseNum}`
        });
      }
    });
  }
  updateView(): void {
    this.covidCaseService.getCovidCases()
    .subscribe(covidCases => {
      this.covidCases = covidCases;
      let numberOfCases = covidCases.length;
      let newCaseLocation : CaseInLocation;
      let newCase : CovidCase = covidCases[numberOfCases - 1];
      let caseRepeated: boolean = false;
      for (let i = 0; i < this.caseInLocation.length; ++i) {
        if (newCase.lat === this.caseInLocation[i].lat && newCase.lng === this.caseInLocation[i].lng) {
          this.caseInLocation[i].caseNum += 1;
          let marker = new google.maps.Marker({
            position: { lat: this.caseInLocation[i].lat, lng: this.caseInLocation[i].lng },
            map: this.map,
            title: `${this.caseInLocation[i].location}
            Number of Cases: ${this.caseInLocation[i].caseNum}`
          });
          caseRepeated = true;
          break;
        }
      }
      if (caseRepeated === false) {
        newCaseLocation = {
          location: newCase.location,
          lat: newCase.lat,
          lng: newCase.lng,
          caseNum: 1
        }
        this.caseInLocation.push(newCaseLocation);
        let marker = new google.maps.Marker({
          position: { lat: newCaseLocation.lat, lng: newCaseLocation.lng },
          map: this.map,
          title: `${newCaseLocation.location}
          Number of Cases: ${newCaseLocation.caseNum}`
        });
      }
    });
  }

  updateViewDelete(covidCase: CovidCase) {
    let marker;
    for (let i = 0; i < this.caseInLocation.length; ++i) {
      if (covidCase.lat === this.caseInLocation[i].lat && covidCase.lng === this.caseInLocation[i].lng) {
        this.caseInLocation[i].caseNum -= 1;
        marker = new google.maps.Marker({
          position: { lat: this.caseInLocation[i].lat, lng: this.caseInLocation[i].lng },
          map: this.map,
          title: `${this.caseInLocation[i].location}
          Number of Cases: ${this.caseInLocation[i].caseNum}`
        });
        break;
      }
    }
  }

}
