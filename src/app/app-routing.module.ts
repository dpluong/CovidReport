import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseDetailComponent } from "./case-detail/case-detail.component";
import { CovidtableComponent } from "./covidtable/covidtable.component";
const routes: Routes = [
  
  { path: 'detail/:id', component: CaseDetailComponent },
  { path: 'report', component: CovidtableComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
