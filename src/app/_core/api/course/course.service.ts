import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseData } from './course-data';
import { CourseApi } from './course.api';

@Injectable()
export class CourseService implements CourseData {

  constructor(private api: CourseApi) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  getById(id: number): Observable<any> {
    return this.api.getById(id);
  }

  deleteById(id: number): Observable<any> {
    return this.api.deleteById(id);
  }

  deleteSelectedId(data: number[]): Observable<any> {
    return this.api.deleteSelectedId(data);
  }

}
