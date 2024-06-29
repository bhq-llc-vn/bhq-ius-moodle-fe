import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsProviderModule } from 'src/app/_theme/iconsProvider.module';
import { NgZorroModule } from 'src/app/_theme/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './delete/delete.component';
import { DriverComponent } from './driver.component';
import { DriverRoutingModule } from './driver-routing.module';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { SubmitFormComponent } from './submit-form/submit-form.component';


@NgModule({
  declarations: [
    DriverFormComponent, DriverComponent, DeleteComponent, SubmitFormComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    IconsProviderModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    DriverComponent
  ]
})
export class DriverModule { }
