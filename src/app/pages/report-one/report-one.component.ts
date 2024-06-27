import { Component, ElementRef, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmFormComponent } from 'src/app/_component/confirm-form/confirm-form.component';
import { UploadFileComponent } from 'src/app/_component/upload-file/upload-file.component';
import { ReportOneData } from 'src/app/_core/api/report-one/report-one-data';

@Component({
  selector: 'app-report-one',
  templateUrl: './report-one.component.html',
  styleUrls: ['./report-one.component.scss']
})
export class ReportOneComponent implements OnInit {

  constructor(
    private reportOneDate: ReportOneData,
    private modalService: NzModalService,
    private notifyService: NzNotificationService,
    private element: ElementRef,
  ) {}

  public listData: any;
  public listId: number[] = [];
  public searchField = ['Name', 'Email', 'Advanced Filter'];

  public pageNumber = 1;
  public pageSize = 10;
  public txtSearch: string | undefined;
  public totalElements = 0;
  public totalPages: number | undefined;

  checkedBoxAll = false;
  FilterValue = '';
  disableRoute = false;
  isCollapse = false;

  modalOptions: any = {
    nzDuration: 2000,
  };

  ngOnInit(): void {
    this.getDriver();
    console.log(this.listId);
  }

  isCollapsed() {
    this.isCollapse = !this.isCollapse;
  }

  search() {
    const input = this.element.nativeElement.querySelector('#search');
    if (this.FilterValue === '') {
      console.log(this.FilterValue);
      this.txtSearch = `name.cn.${input.value},`;
    } else {
      console.log(this.FilterValue);
      this.txtSearch = `${this.FilterValue}.cn.${input.value},`;
      console.log(this.txtSearch);
    }
    this.getDriver();
  }

  getFilterValue(index: number) {
    console.log(this.searchField[index]);
    this.FilterValue = this.searchField[index];
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
      // console.log(item.isChecked);
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
    this.getDriver();
  }

  changePageNumber(event: any) {
    this.pageNumber = event;
    this.getDriver();
  }

  public getDriver() {
    this.reportOneDate
      .searchDriver(this.pageNumber, this.pageSize, this.txtSearch)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listData = res.pagingData.content;
          // console.log(this.listData);
          this.totalElements = res.pagingData.totalElements;
          this.totalPages = res.pagingData.totalPages;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onUpload(): void {
    this.modalService
      .create({
        nzTitle: 'Upload File XML',
        nzClassName: 'modal-custom',
        nzContent: UploadFileComponent,
        nzWidth: 'modal-custom',
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Thêm mới nhân viên',
              this.modalOptions
            );
            this.getDriver();
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onSubmitDriver(data: number[]): void {
    this.modalService
      .create({
        nzContent: ConfirmFormComponent,
        nzWidth: 'modal-custom',
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Chỉnh sửa nhân viên',
              this.modalOptions
            );
          }
          this.getDriver();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onSubmitCourse(data: number[]): void {
    this.modalService
      .create({
        nzContent: ConfirmFormComponent,
        nzWidth: 'modal-custom',
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Chỉnh sửa nhân viên',
              this.modalOptions
            );
          }
          this.getDriver();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }



}
