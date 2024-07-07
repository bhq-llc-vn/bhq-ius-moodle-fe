import { Component, ElementRef, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmFormComponent } from 'src/app/_component/confirm-form/confirm-form.component';
import { ReportOneData } from 'src/app/_core/api/report-one/report-one-data';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor(
    private service: ReportOneData,
    private modalService: NzModalService,
    private notifyService: NzNotificationService,
    private shareService: ShareService,
    private element: ElementRef
  ) { }

  public listData: any;
  public listId: number[] = [];
  public searchField = ['tenKhoaHoc', 'maKhoaHoc'];

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
    this.getCourse();
    console.log(this.listId);
    this.isUploadFileSuccess();
    this.isLoadingData();
  }

  isCollapsed() {
    this.isCollapse = !this.isCollapse;
  }

  isUploadFileSuccess() {
    this.shareService.isUploadingSuccess.subscribe({
      next: (res) => {
        console.log(res);
        if(res) {
          this.txtSearch = "";
          this.getCourse();
        }
      }
    })
  }

  isLoadingData() {
    this.shareService.isTabCourse.subscribe({
      next: (res) => {
        console.log(res);
        if(res) {
          this.txtSearch = "";
          this.getCourse();
        }
      },
      error: (err) => {},
      complete: () => {

      }
    })
  }


  search() {
    const input = this.element.nativeElement.querySelector('#search');
    if(input.value != null || input.value != "") {
      this.txtSearch = `username.cn.${input.value},`;
    }
    this.getCourse();
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
    this.getCourse();
  }

  changePageNumber(event: any) {
    this.pageNumber = event;
    this.getCourse();
  }

  public getCourse() {
    this.service
      .searchCourse(this.pageNumber, this.pageSize, this.txtSearch)
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

  onSubmit(): void {
    this.modalService
      .create({
        nzTitle: 'Đẩy khóa học lên hệ thống',
        nzContent: SubmitFormComponent,
        nzClassName:'modal-custom',
        nzWidth: '400px',
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
        nzComponentParams: {
          listId: this.listId
        }
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
              'Thành công',
              'Đẩy hồ sơ',
              this.modalOptions
            );
          }
          this.getCourse();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

}
