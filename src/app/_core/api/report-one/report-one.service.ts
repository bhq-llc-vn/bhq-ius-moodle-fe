import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportOneData } from './report-one-data';
import { ReportOneApi } from './report-one.api';

@Injectable()
export class ReportOneService implements ReportOneData {

  constructor(private api: ReportOneApi) { }

  searchDriver(pageNumber: number, pageSize: number, txtSearch?: string | undefined): Observable<any> {
    return this.api.searchDriver(pageNumber, pageSize, txtSearch);
  }

  searchCourse(pageNumber: number, pageSize: number, txtSearch?: string | undefined): Observable<any> {
    return this.api.searchCourse(pageNumber, pageSize, txtSearch);
  }

  submitDriver(data: number[]): Observable<any> {
    return this.api.submitDriver(data);
  }

  submitCourse(data: number[]): Observable<any> {
    return this.api.submitCourse(data);
  }

  submitAvatar(data: number[]): Observable<any> {
    return this.api.submitAvatar(data);
  }

  uploadFileXml(file: File): Observable<any> {
    return this.api.uploadFileXml(file);
  }

}
