import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportOneComponent } from './report-one.component';

const routes: Routes = [
  {
    path: '',
    component: ReportOneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportOneRoutingModule { }
