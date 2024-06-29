import { Observable } from "rxjs";

export abstract class ReportOneData {
  abstract searchDriver(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract searchCourse(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract submitDriver(data: number[]): Observable<any>;
  abstract submitCourse(data: number[]): Observable<any>;
  /**
  * using for upload xml file
  * @param file 
  */
  abstract uploadFileXml(file: File): Observable<any>;
}
