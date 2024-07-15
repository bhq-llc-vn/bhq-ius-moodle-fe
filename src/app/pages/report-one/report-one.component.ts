import { Component, ElementRef, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmFormComponent } from 'src/app/_component/confirm-form/confirm-form.component';
import { UploadFileComponent } from 'src/app/_component/upload-file/upload-file.component';
import { ReportOneData } from 'src/app/_core/api/report-one/report-one-data';
import { UploadFileReportOneComponent } from './upload-file-report-one/upload-file-report-one.component';
import { ShareService } from 'src/app/_share/share.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { CourseModel } from 'src/app/_core/model/course';
import { firstValueFrom } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { NotifyService } from 'src/app/_base/notify.service';
import { SubmitFormUploadComponent } from './submit-form-upload/submit-form-upload.component';
import { CourseService } from 'src/app/_core/api/course/course.service';
import { CourseData } from 'src/app/_core/api/course/course-data';
import { SubmitTypeEnum } from 'src/app/_core/enum/submit-type-enum';

@Component({
  selector: 'app-report-one',
  templateUrl: './report-one.component.html',
  styleUrls: ['./report-one.component.scss']
})
export class ReportOneComponent implements OnInit {


  public file: any = {};
  // public fileList: any[] = []; //
  // public upLoading: boolean = false; //
  public progress: number = 0;
  public reportOneInfo: any = {};

  public uploading = false;
  public fileList: NzUploadFile[] = [];
  public listCourse: any[] = [];
  private listId: number[] = [];

  public course = new CourseModel();

  constructor(
    private reportOneData: ReportOneData,
    private modalService: NzModalService,
    private notifyService: NotifyService,
    private shareService: ShareService,
    private courseData: CourseData,
    private element: ElementRef,
  ) { }

  ngOnInit(): void {
    this.getCourses();
    setTimeout(() => {
      this.getReportOneInfo();
    }, 2000)
  }


  modalOptions: any = {
    nzDuration: 2000,
  };


  courseSelectedChange(event: any) {
    console.log(event);
    if (event != null) {
      this.course = this.listCourse.filter(c => c.maKhoaHoc == event)[0];
    }
  }

  onChangeFileEvent(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.file = fileList[0];
      console.log(this.file);
      this.fileList.push(this.file);
    }
  }

  onSubmitEvent(event: any) {
    console.log(event);
    this.listId = event;
  }

  emitEventLoadDataCourse() {
    this.shareService.isTabCourse.next(true);
  }

  emitEventLoadDataDriver() {
    this.shareService.isTabDriver.next(true);
  }

  onUploadXml() {
    // console.log(this.file);
    // console.log(this.fileList);
    if (this.file.type != 'text/xml') {
      this.notifyService.error(
        'File không đúng định dạng XML hoặc bạn chưa chọn file'
      );
    } else {
      if (this.fileList.length == 0) {
        this.notifyService.error(
          'Bạn chưa chọn file'
        );
      } else {
        this.modalService
          .create({
            nzTitle: 'Upload File XML',
            nzClassName: 'modal-custom',
            nzContent: SubmitFormUploadComponent,
            nzWidth: '600px',
            nzCentered: true,
            nzMaskClosable: false,
            nzClosable: true,
            nzFooter: null,
            nzDirection: 'ltr', // left to right
            nzComponentParams: {
              file: this.file,
              data: "Bạn có chắc muốn đẩy file XML " + this.file.name + " này không ?"
            }
          })
          .afterClose.subscribe({
            next: (res) => {
              console.log(res);
              // clear file
              this.file = {};
              this.fileList = []

            },
            error: (res) => {
              console.log(res);
            },
          });
      }
    }


  }

  getCourses() {
    this.reportOneData.searchCourse(1, 9999).subscribe({
      next: (res) => {
        console.log(res);
        this.listCourse = res.pagingData.content;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getCourseById() {
    this.courseData.getById(this.course.id).subscribe({
      next: (res) => {
        console.log(res);
        this.course = res.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getReportOneInfo() {
    if (this.course != null && this.course.id != null) {
      this.reportOneData.getReportOneInfo(this.course.id).subscribe({
        next: (res) => {
          console.log(res);
          this.reportOneData = res.data;
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

  onSubmitCourse() {
    this.modalService
      .create({
        nzTitle: 'Đồng bộ khóa học lên hệ thống',
        nzContent: ConfirmFormComponent,
        nzClassName: 'modal-custom',
        nzWidth: '400px',
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
        nzComponentParams: {
          listId: [this.course.id],
          type: SubmitTypeEnum.COURSE
        }
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          this.getCourseById();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onSubmitDriver() {
    this.modalService
      .create({
        nzTitle: 'Đồng bộ học viên lên hệ thống',
        nzContent: ConfirmFormComponent,
        nzClassName: 'modal-custom',
        nzWidth: '400px',
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
        nzComponentParams: {
          listId: this.listId,
          type: SubmitTypeEnum.DRIVER
        }
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          this.emitEventLoadDataDriver();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onSubmitAvatar() {
    this.modalService
      .create({
        nzTitle: 'Đồng bộ ảnh đại diện lên hệ thống',
        nzContent: ConfirmFormComponent,
        nzClassName: 'modal-custom',
        nzWidth: '400px',
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
        nzComponentParams: {
          listId: this.listId,
          type: SubmitTypeEnum.AVATAR
        }
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          this.emitEventLoadDataDriver();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onSubmitUserEnroll() {
    this.modalService
      .create({
        nzTitle: 'Đồng bộ đăng ký lên hệ thống',
        nzContent: ConfirmFormComponent,
        nzClassName: 'modal-custom',
        nzWidth: '400px',
        nzCentered: true,
        nzMaskClosable: false,
        nzDirection: 'ltr', // left to right
        nzComponentParams: {
          listId: this.listId,
          type: SubmitTypeEnum.ENROLL
        }
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          this.emitEventLoadDataDriver();
        },
        error: (res) => {
          console.log(res);
        },
      });
  }



}
