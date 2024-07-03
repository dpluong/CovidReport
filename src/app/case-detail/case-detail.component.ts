/// <reference types="@types/googlemaps" />
import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { CovidCase } from "../CovidCase";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CovidCaseService } from "../covid-case.service";

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css']
})
export class CaseDetailComponent implements OnInit, AfterViewInit {
  covidCase?: CovidCase;
  
  map: google.maps.Map;
  constructor(
    private route: ActivatedRoute,
    private covidCaseService: CovidCaseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCovidCase();
  }
  ngAfterViewInit(): void {
    //this.getCovidCase();
    
    //this.autocompleteLocation();
  }
  getCovidCase(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.covidCaseService.getCovidCase(id)
    .subscribe(covidCase => this.covidCase = covidCase);
    
  }
  goBack(): void {
    this.location.back();
    this.covidCaseService.updateHero(this.covidCase).subscribe(covidCase => this.covidCase = covidCase);
    
  }
  autocompleteLocation(): void {
    let mapProp = {
      center: new google.maps.LatLng(49.2, -123),
      zoom: 10,
      
    };
    this.map = new google.maps.Map(document.getElementById('map-canvas'), mapProp);
    let input = document.getElementById('location') as HTMLInputElement;
    let options = {
      types: ['geocode']
    };

    let autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', this.map);
    let updateCase = this.covidCase;
    
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      let place = autocomplete.getPlace();
      updateCase.location = place.formatted_address;
      updateCase.lat = place.geometry.location.lat();
      updateCase.lng = place.geometry.location.lng();
    });
    this.covidCase.location = updateCase.location;
    this.covidCase.lat = updateCase.lat;
    this.covidCase.lng = updateCase.lng;
  }
}
