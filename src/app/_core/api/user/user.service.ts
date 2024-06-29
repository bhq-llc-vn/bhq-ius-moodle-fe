import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from './user-data';
import { UserApi } from './user.api';
import { UserModel } from '../../model/user';

@Injectable()
export class UserService implements UserData {

  constructor(private api: UserApi) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  save(data: UserModel): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: UserModel): Observable<any> {
    return this.api.update(id, data);
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

  getUserInfo(username: string): Observable<any> {
    return this.api.getUserInfo(username);
  }




}
