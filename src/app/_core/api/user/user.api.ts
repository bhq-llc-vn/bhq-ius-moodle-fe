import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_base/http.service';
import { UserModel } from '../../model/user';

@Injectable()
export class UserApi {

  private readonly apiController: string = 'user';

  constructor(private http: HttpService) { }

  getUserInfo(username: string): Observable<any> {
    return this.http.get(`${this.apiController}/${username}`);
  }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.http.get(
      `${this.apiController}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${txtSearch}`
    );
  }

  save(data: UserModel): Observable<any> {
    return this.http.post(this.apiController, data);
  }

  update(id: number, data: UserModel): Observable<any> {
    return this.http.put(`${this.apiController}` + "/" + id, data);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiController}` + "/" + id);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.apiController}` + "/" + id);
  }

  deleteSelectedId(data: number[]): Observable<any> {
    return this.http.post(`${this.apiController}/deleteByListId`, data);
  }
  

}
