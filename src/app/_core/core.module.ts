import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '../_base/base.module';
import { MemberApi } from './api/member/member.api';
import { MemberData } from './api/member/member-data';
import { MemberService } from './api/member/member.service';
import { UploadFileService } from './api/upload-file/upload-file.service';
import { UploadFileData } from './api/upload-file/upload-file-data';
import { UploadFileApi } from './api/upload-file/upload-file.api';
import { UserApi } from './api/user/user.api';
import { UserData } from './api/user/user-data';
import { UserService } from './api/user/user.service';
import { ReportOneData } from './api/report-one/report-one-data';
import { ReportOneService } from './api/report-one/report-one.service';
import { ReportOneApi } from './api/report-one/report-one.api';
import { CourseApi } from './api/course/course.api';
import { CourseData } from './api/course/course-data';
import { CourseService } from './api/course/course.service';

const API = [
  MemberApi,
  UploadFileApi,
  UserApi,
  ReportOneApi,
  CourseApi
];

const SERVICES = [
  { provide: MemberData, useClass: MemberService },
  { provide: UploadFileData, useClass: UploadFileService },
  { provide: UserData, useClass: UserService },
  { provide: ReportOneData, useClass: ReportOneService },
  { provide: CourseData, useClass: CourseService }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, BaseModule.forRoot()],
  exports: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...API, ...SERVICES],
    };
  }
}
