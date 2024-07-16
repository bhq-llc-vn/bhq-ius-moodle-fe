import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_base/http.service';

@Injectable()
export class ReportOneApi {

  private readonly apiDriverUrl: string = 'driver';
  private readonly apiCourseUrl: string = 'course';
  private readonly apiReportOneUrl: string = 'report-one';

  constructor(private http: HttpService) { }

  searchDriver(pageNumber: number, pageSize: number, txtSearch?: string | undefined, sort?: string | undefined, courseId?: number | undefined): Observable<any> {
    let url = '';
    if (txtSearch) url = '&search=' + txtSearch;
    if (sort) url = url + '&sort=' + sort;
    if (courseId) url = url + '&courseId=' + courseId;
    return this.http.get(
      `${this.apiDriverUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}${url}`
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

  submitAvatar(data: number[]): Observable<any> {
    return this.http.post(this.apiReportOneUrl + '/submit-avatar', data);
  }

  submitEnroll(data: number[]): Observable<any> {
    return this.http.post(this.apiReportOneUrl + '/submit-enroll', data);
  }

  getReportOneInfo(id: number): Observable<any> {
    return this.http.get(this.apiReportOneUrl + '/get-report-one-info/' + id);
  }

  uploadFileXml(file: File): Observable<any> {
    console.log(file);
    const blob: Blob = new Blob([file])
    const formData = new FormData();
    formData.append("file", blob, file.name);

    const headers = {
      // 'Content-Type': 'application/json',
    }
    const options = {
      // formData: formData,
      // headers: headers,
      reportProgress: true
    }
    // Display the key/value pairs
    formData.forEach((key, value) => {
      console.log(key);
      console.log(value);
    })
    console.log(formData);
    console.log(formData.getAll('multipartFile'));

    return this.http.post(this.apiReportOneUrl + '/upload-xml', formData, options);
  }

}
