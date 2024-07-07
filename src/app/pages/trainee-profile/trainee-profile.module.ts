import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraineeProfileRoutingModule } from './trainee-profile-routing.module';
import { TraineeProfileComponent } from './trainee-profile/trainee-profile.component';


@NgModule({
  declarations: [
    TraineeProfileComponent
  ],
  imports: [
    CommonModule,
    TraineeProfileRoutingModule
  ]
})
export class TraineeProfileModule { }
