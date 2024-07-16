import { Observable } from "rxjs";

export abstract class ReportOneData {
  abstract searchDriver(pageNumber: number, pageSize: number, txtSearch?: string, sort?: string, courseId?: number): Observable<any>;
  abstract searchCourse(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract submitDriver(data: number[]): Observable<any>;
  abstract submitCourse(data: number[]): Observable<any>;
  abstract submitAvatar(data: number[]): Observable<any>;
  abstract submitEnroll(data: number[]): Observable<any>;
  abstract getReportOneInfo(id: number): Observable<any>;
  /**
  * using for upload xml file
  * @param file 
  */
  abstract uploadFileXml(file: File): Observable<any>;
}
