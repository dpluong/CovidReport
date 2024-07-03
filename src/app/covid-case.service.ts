import { Injectable } from '@angular/core';
import { CovidCase } from "./CovidCase";
import { COVIDCASES } from "./mock-covidcases";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidCaseService  {
 private apiUrl = 'api/covidCases';
 httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  constructor(private http: HttpClient) { }
  
  getCovidCases(): Observable<CovidCase[]> {
    return this.http.get<CovidCase[]>(this.apiUrl)
  }
  
  getCovidCase(id: number): Observable<CovidCase> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CovidCase>(url);
  }

  addCovidCase(covidCase: CovidCase): Observable<CovidCase> {
    return this.http.post<CovidCase>(this.apiUrl, covidCase, this.httpOptions)
  }
  
  updateHero(covidCase: CovidCase): Observable<any> {
    return this.http.put(this.apiUrl, covidCase, this.httpOptions);
  }

  deleteCase(id: number): Observable<CovidCase> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<CovidCase>(url, this.httpOptions);
  }

}
