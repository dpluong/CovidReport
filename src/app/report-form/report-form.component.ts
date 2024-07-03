/// <reference types="@types/googlemaps" />
import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CovidCase } from "../CovidCase";
import { CovidCaseService } from "../covid-case.service";

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit, AfterViewInit {
  @Output() submitted = new EventEmitter<boolean>();
  didSubmit = false;
  updateCase?: CovidCase = {
    location: "",
    lat: 0,
    lng: 0,
    phoneNum: "",
    personReported: "",
    date: "",
    extra: "",
  };
  covidCase?: CovidCase;
  covidCases: CovidCase[] = [];
  map: google.maps.Map;
  reportForm = new FormGroup({
    location: new FormControl(''),
    lat: new FormControl(''),
    lng: new FormControl(''),
    phoneNum: new FormControl(''),
    personReported: new FormControl(''),
    date: new FormControl(''),
    extra: new FormControl('')
  });
  constructor(private covidCaseService: CovidCaseService) { }

  ngOnInit(): void {
    this.getCovidCases();
  }
  ngAfterViewInit(): void {
    this.autocompleteLocation();
  }
  getCovidCases(): void {
    this.covidCaseService.getCovidCases()
    .subscribe(covidCases => this.covidCases = covidCases);
  }
  
  autocompleteLocation(): void {
    let mapProp = {
      center: new google.maps.LatLng(49.2, -123),
      zoom: 10,
    };
    this.map = new google.maps.Map(document.getElementById('map-canvas'), mapProp);
    let input = document.getElementById('location') as HTMLInputElement;
    //input.addEventListener('touchstart', handler, {passive: true})
    let options = {
      types: ['geocode']
    };

    let autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', this.map);
    let updateCase = this.updateCase;
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      let place = autocomplete.getPlace();
      updateCase.location = place.formatted_address;
      updateCase.lat = place.geometry.location.lat();
      updateCase.lng = place.geometry.location.lng();
    });
    this.updateCase.location = updateCase.location;
    this.updateCase.lat = updateCase.lat;
    this.updateCase.lng = updateCase.lng
    //console.log(this.updateCase.location);
  }
  onSubmit(submitted : boolean) {
    let data = this.reportForm.value;
    let id: number;
    if (this.covidCases.length === 0) {
      id = 0;
    } else {
      id = this.covidCases[this.covidCases.length - 1].id + 1;
    }
    if (this.updateCase.location !== "" ) {
      this.covidCase = {
        id: id,
        location: this.updateCase.location,
        lat: this.updateCase.lat,
        lng: this.updateCase.lng,
        phoneNum: data.phoneNum,
        personReported: data.personReported,
        date: data.date,
        extra: data.extra
      }
    } else {
      this.covidCase = {
        id: id,
        location: data.location,
        lat: data.lat,
        lng: data.lng,
        phoneNum: data.phoneNum,
        personReported: data.personReported,
        date: data.date,
        extra: data.extra
      }
    }
    
    this.covidCaseService.addCovidCase(this.covidCase).subscribe(covidCase => this.covidCases.push(covidCase));
    this.submitted.emit(submitted);
    this.didSubmit = true;
  }
}
