import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HasPermissionService } from 'src/app/_base/guard/has-permission.service';
import { ModeModal } from 'src/app/_base/util';
import { UserData } from 'src/app/_core/api/user/user-data';
import { UserModel } from 'src/app/_core/model/user';
import { DeleteComponent } from '../project/delete/delete.component';
import { SubProjectComponent } from '../project/sub-project/sub-project.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ConfirmFormComponent } from 'src/app/_component/confirm-form/confirm-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private service: UserData,
    private modalService: NzModalService,
    private notifyService: NzNotificationService,
    private element: ElementRef,
    private router: Router,
    public hasPermission: HasPermissionService
  ) { }

  mapOfExpandData: { [key: string]: boolean } = {};
  public listData: any;
  public listId: number[] = [];


  public pageNumber = 1;
  public pageSize = 10;
  public txtSearch: string | undefined = '';
  public totalElements = 0;
  public totalPages: number | undefined;

  isShow: boolean = false;

  checkedBoxAll: boolean = false;
  FilterValue = '';
  SorterValue = 'id_asc,';


  disableRoute = false;
  hiddenTimeline: boolean = true;

  modalOptions: any = {
    nzDuration: 2000,
  };

  ngOnInit(): void {
    this.getAllUser();
    console.log(this.listId);
  }


  search() {
    const input = this.element.nativeElement.querySelector('#search');
    if(input.value != '' || input.value != 'undefined') {
      this.txtSearch += `username.cn.${input.value},`;
    }
    this.getAllUser();
  }



  checkedAll(event: any) {
    console.log(event);
    this.listData.forEach((item: { isChecked: any; id: number }) => {
      item.isChecked = event;
      if (item.isChecked === true && this.listId.indexOf(item.id) === -1)
        this.listId.push(item.id);
      else if (item.isChecked === true && this.listId.indexOf(item.id) !== -1) {
        return;
      } else this.listId = [];
      console.log(this.listId);
    });
  }

  isChecked(event: any, index: number) {
    this.listData[index].isChecked = event;
    this.checkIntoArr(index);
    // console.log(this.listData[index].isChecked);
    console.log(this.listId);
  }

  checkIntoArr(index: number) {
    let a = this.listData[index];
    // debugger;
    if (a.isChecked === true && this.listId.indexOf(a.id) === -1) {
      this.listId.push(a.id);
    } else {
      let b = this.listId.indexOf(a.id);
      console.log(b);
      // debugger;
      if (b > -1) {
        this.listId.splice(b, 1);
      }
    }
  }

  changePageSize(event: any) {
    this.pageSize = event;
    this.getAllUser();
  }

  changePageNumber(event: any) {
    this.pageNumber = event;
    this.getAllUser();
  }

  public getAllUser() {
    this.service
      .search(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          // debugger;
          console.log(res);
          this.listData = res.pagingData.content;
          console.log(this.listData);
          this.totalElements = res.pagingData.totalElements;
          this.totalPages = res.pagingData.totalPages;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  

  onView(item: UserModel): void {
    this.modalService.create({
      nzTitle: 'Xem chi tiết',
      nzClassName: 'modal-custom',
      nzContent: UserFormComponent,
      nzWidth: '900px',
      nzCentered: true,
      nzMaskClosable: false,
      nzComponentParams: {
        id: item.id,
        mode: ModeModal.VIEW,
      },
      nzDirection: 'ltr', // left to right
    });
  }

  onCreate() {
    this.modalService
      .create({
        nzTitle: 'Tạo mới người dùng',
        nzClassName: 'modal-custom',
        nzContent: UserFormComponent,
        nzWidth: '900px',
        nzCentered: true,
        nzMaskClosable: false,
        nzComponentParams: {
          mode: ModeModal.CREATE,
        },
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Tạo mới người dùng',
              this.modalOptions
            );
          }
          this.search();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }


  onUpdate(item: UserModel) {
    this.modalService
      .create({
        nzTitle: 'Chỉnh sửa người dùng',
        nzClassName: 'modal-custom',
        nzContent: UserFormComponent,
        nzWidth: '900px',
        nzCentered: true,
        nzMaskClosable: false,
        nzComponentParams: {
          mode: ModeModal.UPDATE,
          id: item.id,
        },
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Chỉnh sửa người dùng',
              this.modalOptions
            );
          }
          this.search();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onDelete(id: number): void {
    this.modalService
      .create({
        nzTitle: 'Xóa dự người dùng',
        nzClassName: 'modal-custom',
        nzContent: ConfirmFormComponent,
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.service.deleteById(id).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa dự án con',
                    this.modalOptions
                  );
                }
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => { },
            });
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onDeleteAll(listId: number[]) {
    this.modalService
      .create({
        nzTitle: 'Xóa danh sách người dùng',
        nzClassName: 'modal-custom',
        nzContent: DeleteComponent,
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.service.deleteSelectedId(listId).subscribe({
              next: (res) => {
                if (res) {
                  this.notifyService.success(
                    'Thành công',
                    'Xóa người dùng',
                    this.modalOptions
                  );
                }
                this.getAllUser();
              },
              error: (err) => {
                console.log(err);
                console.log(listId);
                console.log(this.listData);
              },
              complete: () => { },
            });
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }


}
