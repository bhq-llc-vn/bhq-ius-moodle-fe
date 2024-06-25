import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './team-routing.module';
import { DriverFormComponent } from './team-form/team-form.component';
import { IconsProviderModule } from 'src/app/_theme/iconsProvider.module';
import { NgZorroModule } from 'src/app/_theme/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriverComponent } from './team.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    DriverFormComponent, DriverComponent, DeleteComponent
  ],
  imports: [
    CommonModule,
    DriverRoutingModule,
    IconsProviderModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class TeamModule { }
