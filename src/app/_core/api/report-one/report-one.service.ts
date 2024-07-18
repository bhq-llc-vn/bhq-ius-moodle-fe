import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportOneData } from './report-one-data';
import { ReportOneApi } from './report-one.api';

@Injectable()
export class ReportOneService implements ReportOneData {

  constructor(private api: ReportOneApi) { }

  searchDriver(pageNumber: number, pageSize: number, txtSearch?: string | undefined, sort?: string | undefined, courseId?: number | undefined): Observable<any> {
    return this.api.searchDriver(pageNumber, pageSize, txtSearch, sort, courseId);
  }

  searchCourse(pageNumber: number, pageSize: number, txtSearch?: string | undefined): Observable<any> {
    return this.api.searchCourse(pageNumber, pageSize, txtSearch);
  }

  submitDriver(data: number[], courseId: number): Observable<any> {
    return this.api.submitDriver(data, courseId);
  }

  submitCourse(data: number[]): Observable<any> {
    return this.api.submitCourse(data);
  }

  submitAvatar(data: number[], courseId: number): Observable<any> {
    return this.api.submitAvatar(data, courseId);
  }

  submitEnroll(data: number[], courseId: number): Observable<any> {
    return this.api.submitEnroll(data, courseId);
  }

  getReportOneInfo(id?: number): Observable<any> {
    return this.api.getReportOneInfo(id);
  }

  uploadFileXml(file: File): Observable<any> {
    return this.api.uploadFileXml(file);
  }

}
