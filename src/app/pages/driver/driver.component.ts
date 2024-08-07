import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DeleteComponent } from './delete/delete.component';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { ConfirmFormComponent } from 'src/app/_component/confirm-form/confirm-form.component';
import { ReportOneData } from 'src/app/_core/api/report-one/report-one-data';
import { Driver } from 'src/app/_core/model/driver';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import { ShareService } from 'src/app/_share/share.service';
import { SubmitTypeEnum } from 'src/app/_core/enum/submit-type-enum';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  constructor(
    private service: ReportOneData,
    private modalService: NzModalService,
    private notifyService: NzNotificationService,
    private shareService: ShareService,
    private element: ElementRef
  ) { }


  public listData: any;
  public listId: number[] = [];
  public searchField = ['Name', 'Email', 'Advanced Filter'];
  public sortValue = '';

  public pageNumber = 1;
  public pageSize = 10;
  public txtSearch: string | undefined;
  public totalElements = 0;
  public totalPages: number | undefined;
  private courseId: number | undefined;

  checkedBoxAll = false;
  FilterValue = '';
  disableRoute = false;
  isCollapse = false;

  modalOptions: any = {
    nzDuration: 2000,
  };

  ngOnInit(): void {
    // this.getDriver();
    console.log(this.listId);
    // this.isUploadFileSuccess();
    this.isLoadingDataByCourseId();
  }

  isLoadingDataByCourseId() {
    this.shareService.isLoadDriverByCourseId.subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.courseId = res;
          this.getDriver(this.courseId);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {

      }
    })
  }

  isCollapsed() {
    this.isCollapse = !this.isCollapse;
  }

  search() {
    const input = this.element.nativeElement.querySelector('#search');
    if (input.value != null || input.value != "") {
      this.txtSearch = `maDK.cn.${input.value},`;
    }
    this.getDriver(this.courseId);
  }

  getFilterValue(index: number) {
    console.log(this.searchField[index]);
    this.FilterValue = this.searchField[index];
  }


  changePageSize(event: any) {
    this.pageSize = event;
    this.getDriver(this.courseId);
  }

  changePageNumber(event: any) {
    this.pageNumber = event;
    this.getDriver(this.courseId);
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
    this.shareService.isLoadingListId.next(this.listId);    
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

  public getDriver(courseId?: number | undefined) {
    this.service
      .searchDriver(this.pageNumber, this.pageSize, this.txtSearch, this.sortValue, courseId)
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


  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    if (sortField && sortOrder) {
      let str = sortField + "_" + sortOrder + ","
      this.sortValue = str;
    }
    console.log(this.sortValue);
    console.log(this.courseId);
    if (this.courseId) {
      this.getDriver(this.courseId);
    }
  }

}
