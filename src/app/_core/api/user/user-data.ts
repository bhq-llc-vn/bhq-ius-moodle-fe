import { Observable } from "rxjs";
import { UserModel } from "../../model/user";

export abstract class UserData {
  abstract getUserInfo(usrename: string): Observable<any>;
  abstract search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any>;
  abstract save(data: UserModel): Observable<any>;
  abstract update(id:number, data: UserModel): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
