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

  public uploading = false;
  public fileList: NzUploadFile[] = [];
  public listCourse: any[] = [];

  public course = new CourseModel();

  constructor(
    private reportOneDate: ReportOneData,
    private modalService: NzModalService,
    private notifyService: NotifyService,
    private shareService: ShareService,
    private element: ElementRef,
  ) { }

  ngOnInit(): void {
    this.getCourses();
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

    }
  }

  emitEventLoadDataCourse() {
    this.shareService.isTabCourse.next(true);
  }

  emitEventLoadDataDriver() {
    this.shareService.isTabDriver.next(true);
  }

  onUpload(): void {
    this.modalService
      .create({
        nzTitle: 'Upload File XML',
        nzClassName: 'modal-custom-upload-file',
        nzContent: UploadFileReportOneComponent,
        nzWidth: '600px',
        nzCentered: true,
        nzMaskClosable: false,
        nzClosable: true,
        nzFooter: null,
        nzDirection: 'ltr', // left to right
      })
      .afterClose.subscribe({
        next: (res) => {
          console.log(res);
          if (res) {
            this.notifyService.success(
             'Upload Báo cáo 1',
            );
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }

  onUploadXml() {
 
    if(this.file != null) {
      if (this.file.type != 'text/xml') {
        this.notifyService.error(
          'File không đúng định dạng XML'
        );
      }

      this.reportOneDate.uploadFileXml(this.file).subscribe(
        {
          next: (res) => {
            console.log(res);
            if (res.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * res.loaded / res.total);
            }
            if (res.message === ResponseStatusEnum.error) {
              this.notifyService.error("Có lỗi trong quá trình upload")
              return;
            }
            if (res.message === ResponseStatusEnum.success) {
              this.notifyService.success("Upload file thành công");
              this.shareService.isUploadingSuccess.next(true);
            }

          },
          error: (err) => {
            console.log(err);
          }
        }
      );
      
    }
    
   

   
  }

  getCourses() {
    this.reportOneDate.searchCourse(1, 9999).subscribe({
      next: (res) => {
        console.log(res);
        this.listCourse = res.pagingData.content;
      },
      error: (error) => {
        console.log(error);
      }
    })

  }




}
