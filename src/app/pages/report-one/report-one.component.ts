import { Component, ElementRef, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmFormComponent } from 'src/app/_component/confirm-form/confirm-form.component';
import { UploadFileComponent } from 'src/app/_component/upload-file/upload-file.component';
import { ReportOneData } from 'src/app/_core/api/report-one/report-one-data';
import { UploadFileReportOneComponent } from './upload-file-report-one/upload-file-report-one.component';

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

  ngOnInit(): void {
  }

 
  modalOptions: any = {
    nzDuration: 2000,
  };

  

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
              'Thành công',
              'Upload Báo cáo 1',
              this.modalOptions
            );
          }
        },
        error: (res) => {
          console.log(res);
        },
      });
  }


  



}
