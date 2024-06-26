import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_base/http.service';

@Injectable()
export class ReportOneApi {

  private readonly apiDriverUrl: string = '/driver';
  private readonly apiCourseUrl: string = '/course';
  private readonly apiReportOneUrl: string = '/report-one';

  constructor(private http: HttpService) { }

  searchDriver(pageNumber: number, pageSize: number, txtSearch?: string | undefined): Observable<any> {
    // let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get(
      `${this.apiDriverUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  searchCourse(pageNumber: number, pageSize: number, txtSearch?: string | undefined): Observable<any> {
    // let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get(
      `${this.apiCourseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  submitDriver(data: number[]): Observable<any> {
    return this.http.post(this.apiReportOneUrl + '/submit-driver', data);
  }

  submitCourse(data: number[]): Observable<any> {
    return this.http.post(this.apiReportOneUrl + '/submit-course', data);
  }

  uploadFileXml(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('fileName', file);
    return this.http.post(this.apiReportOneUrl + '/upload-xml', formData);
  }

}
