import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NotifyService } from 'src/app/_base/notify.service';
import { ReportOneData } from 'src/app/_core/api/report-one/report-one-data';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { UploadFile } from 'src/app/_core/model/upload-file';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-upload-file-report-one',
  templateUrl: './upload-file-report-one.component.html',
  styleUrls: ['./upload-file-report-one.component.scss']
})
export class UploadFileReportOneComponent implements OnInit {

  public file: any = {};
  public fileList: any[] = []; //
  public upLoading: boolean = false; //
  public progress: number = 0;
  public formValidation!: FormGroup;
  public files: any[] = [];
  public fileTypeSupport = 'xml';

  @Input() title: string = '';
  @Input() taskId: number = 0;

  modalOptions: any = {
    nzDuration: 2000,
  };

  constructor(
    private modelRef: NzModalRef<UploadFileReportOneComponent>,
    private service: ReportOneData,
    private notifyService: NotifyService,
    private shareService: ShareService,
    private fb: FormBuilder,
  ) {
    this.formValidation = this.fb.group({
      isLoading: [false, []]
    })
  }

  ngOnInit(): void {
    // this.isLoadingSpinner();
  }

  //event
  isLoadingSpinner() {
    this.shareService.isLoadingModal.subscribe({
      next: (res) => {
        console.log(res);
        this.upLoading = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onChangeEventUploadFile(event: any): void {
    console.log(event)
    this.fileList = event;
  }

  onDeleteEvent(event: any): void {
    if (event && event.message === ResponseStatusEnum.success) {
      this.notifyService.success("Xóa thành công");
    }
    if (event && event.message === ResponseStatusEnum.error) {
      this.notifyService.error(event.message);
    }
  }

  // end event




  save() {
    // this.upLoading = true;
    if (this.fileList && this.fileList.length > 0) {
      let uploadFile: UploadFile = {};
      uploadFile.taskId = this.taskId;
      // uploadFile.name = file.name;

      this.service.uploadFileXml(this.fileList[0]).subscribe(
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
              setTimeout(() => {
                this.close()
              }, 1000);
            }

          },
          error: (err) => {
            console.log(err);
          }
        }
      );
    }
    // this.upLoading = false;

  };

  handleChange(info: NzUploadChangeParam): void {
    console.log(info);
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show one recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    console.log(fileList)

    this.fileList = fileList;

  }



  close() {
    this.modelRef.close();
  }
}
