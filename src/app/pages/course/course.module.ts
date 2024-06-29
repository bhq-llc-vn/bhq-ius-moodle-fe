import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsProviderModule } from 'src/app/_theme/iconsProvider.module';
import { NgZorroModule } from 'src/app/_theme/ng-zorro.module';
import { SubmitFormComponent } from './submit-form/submit-form.component';


@NgModule({
  declarations: [
    CourseComponent,
    SubmitFormComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    IconsProviderModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [CourseComponent]
})
export class CourseModule { }
