import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class ShareService {

  public taskDataShare: Subject<any> = new Subject<any>();
  public taskDetailShare: Subject<any> = new Subject<any>();
  public permissionsShare: Subject<any> = new Subject<any>();

  // events
  public isLoading: Subject<boolean> = new Subject<boolean>(); // dung cho spinner
  public isAddSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDialogSave: Subject<any> = new Subject<any>();
  public isLoadingModal: Subject<boolean> = new Subject<boolean>(); // dung cho spinner tại modal
  public isUploadingSuccess: Subject<boolean> = new Subject<boolean>();
  public isTabCourse: Subject<boolean> = new Subject<boolean>();
  public isTabDriver: Subject<boolean> = new Subject<boolean>();
  public isLoadDriverByCourseId: Subject<any> = new Subject<any>();
  public isLoadingListId: Subject<any> = new Subject<any>();
  // end events

  //store data
  public menuInfoData: Subject<any> = new Subject();
  public permissions: Subject<any> = new Subject();
  //

  constructor() { }
}
