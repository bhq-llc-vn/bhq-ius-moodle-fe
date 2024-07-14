import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ReportOneData } from 'src/app/_core/api/report-one/report-one-data';
import { SubmitTypeEnum } from 'src/app/_core/enum/submit-type-enum';
import { SubmitFormComponent } from '../../driver/submit-form/submit-form.component';
import { NotifyService } from 'src/app/_base/notify.service';
import { HttpEventType } from '@angular/common/http';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { ShareService } from 'src/app/_share/share.service';

@Component({
  selector: 'app-submit-form-upload',
  templateUrl: './submit-form-upload.component.html',
  styleUrls: ['./submit-form-upload.component.scss']
})
export class SubmitFormUploadComponent implements OnInit {

  @Input() title: string = '';
  @Input() data: string = '';
  @Input() listId: number[] = [];
  @Input() type: string = '';
  @Input() file: any;

  isVisible = false;
  isConfirmLoading = false;
  public progress: number = 0;

  constructor(private modalRef: NzModalRef<SubmitFormComponent>,
    private service: ReportOneData,
    private notifyService: NotifyService,
    private shareService: ShareService
  ) { }



  ngOnInit(): void {

  }

  handleOk(): void {
    this.isConfirmLoading = true;
    if (this.file != null) {
      if (this.file.type != 'text/xml') {
        this.notifyService.error(
          'File không đúng định dạng XML'
        );
        this.isConfirmLoading = false;
      }

      this.service.uploadFileXml(this.file).subscribe(
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
            this.isConfirmLoading = false;
            this.handleCancel();
          },
          error: (err) => {
            console.log(err);
            this.isConfirmLoading = false;
            this.handleCancel();
          }
        }
      );

    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.modalRef.close();
  }

}
