import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportOneRoutingModule } from './report-one-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/_share/share.module';
import { IconsProviderModule } from 'src/app/_theme/iconsProvider.module';
import { NgZorroModule } from 'src/app/_theme/ng-zorro.module';
import { ReportOneComponent } from './report-one.component';
import { DriverModule } from '../driver/driver.module';
import { CourseModule } from '../course/course.module';
import { UploadFileReportOneComponent } from './upload-file-report-one/upload-file-report-one.component';
import { ComponentModule } from 'src/app/_component/component.module';


@NgModule({
  declarations: [
    ReportOneComponent,
    UploadFileReportOneComponent
  ],
  imports: [
    CommonModule,
    ReportOneRoutingModule,
    DriverModule,
    CourseModule,
    IconsProviderModule,
    NgZorroModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ShareModule,
    ComponentModule
  ]
})
export class ReportOneModule { }
