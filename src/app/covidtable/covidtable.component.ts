import { Component, OnInit, ViewChild } from '@angular/core';
import { CovidCase } from '../CovidCase';
import { COVIDCASES } from "../mock-covidcases";
import { CovidCaseService } from "../covid-case.service";
import { CovidmapComponent } from "../covidmap/covidmap.component";

@Component({
  selector: 'app-covidtable',
  templateUrl: './covidtable.component.html',
  styleUrls: ['./covidtable.component.css'],
  providers: [CovidCaseService]
})
export class CovidtableComponent implements OnInit {
  covidCases: CovidCase[] = [];
  @ViewChild(CovidmapComponent)
  private mapComponent: CovidmapComponent;
  constructor(private covidCaseService: CovidCaseService) { }

  ngOnInit(): void {
    //mock database
    //this.initData();
    this.getCovidCases();
  }

  getCovidCases(): void {
    this.covidCaseService.getCovidCases()
    .subscribe(covidCases => this.covidCases = covidCases);
  }
  
  onRemove(covidCase: CovidCase): void {
    const index = this.covidCases.indexOf(covidCase);
    this.covidCases.splice(index, 1);
    //console.log(covidCase.id);
    this.covidCaseService.deleteCase(covidCase.id).subscribe();   
    this.mapComponent.updateViewDelete(covidCase);
  }

  onSubmitted(submitted:boolean) {
    this.getCovidCases();
    this.mapComponent.updateView();
  }

}
