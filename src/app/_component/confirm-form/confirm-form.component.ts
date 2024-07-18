import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NotifyService } from 'src/app/_base/notify.service';
import { ReportOneData } from 'src/app/_core/api/report-one/report-one-data';
import { ResponseStatusEnum } from 'src/app/_core/enum/response-status-enum';
import { SubmitTypeEnum } from 'src/app/_core/enum/submit-type-enum';
import { ShareService } from 'src/app/_share/share.service';
import { SubmitFormComponent } from 'src/app/pages/driver/submit-form/submit-form.component';

@Component({
  selector: 'app-confirm-form',
  templateUrl: './confirm-form.component.html',
  styleUrls: ['./confirm-form.component.scss']
})
export class ConfirmFormComponent implements OnInit {

  @Input() title: string = '';
  @Input() data: string = '';
  @Input() listId: number[] = [];
  @Input() type: string = '';
  @Input() courseId: number = 0;

  isVisible = false;
  isConfirmLoading = false;

  constructor(private modalRef: NzModalRef<SubmitFormComponent>,
    private service: ReportOneData,
    private notifyService: NotifyService,
    private shareService: ShareService
  ) { }

  buildMessage() {
    let type = "";
    switch (this.type) {
      case SubmitTypeEnum.COURSE:
        type = "KHÓA HỌC"
        break;
      case SubmitTypeEnum.DRIVER:
        type = "HỒ SƠ"
        break;
      case SubmitTypeEnum.AVATAR:
        type = "ẢNH"
        break;
      case SubmitTypeEnum.ENROLL:
        type = "ĐĂNG KÝ"
        break;
      default:
        break;
    }

    if (this.listId.length > 0) {
      this.data = 'Bạn có chắc muốn đồng bộ DANH SÁCH ' + type + ' này không ?'
    } else {
      this.data = 'Bạn có chắc muốn đồng bộ TOÀN BỘ ' + type + ' không ?'
    }
  }

  ngOnInit(): void {
    // this.data = 'Bạn có chắc muốn xóa ????';
    this.buildMessage();
    console.log(this.courseId)
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    switch (this.type) {
      case SubmitTypeEnum.AVATAR:
        this.service.submitAvatar(this.listId, this.courseId).subscribe(res => {
          if (res.status == 200) {
            this.notifyService.success("Đồng bộ ảnh đại diện");
          }
          if (res.status != 200) {
            this.notifyService.error(res.error);
          }
          this.isConfirmLoading = false;
          this.modalRef.close(true);

        })
        break;
      case SubmitTypeEnum.DRIVER:
        this.service.submitDriver(this.listId, this.courseId).subscribe(res => {
          if (res.status == 200) {
            this.notifyService.success("Đồng bộ học viên");
          }
          if (res.status != 200) {
            this.notifyService.error(res.error);
          }
          this.isConfirmLoading = false;
          this.modalRef.close(true);
        })
        break;
      case SubmitTypeEnum.COURSE:
        this.service.submitCourse(this.listId).subscribe(res => {
          if (res.status == 200) {
            this.notifyService.success("Đồng bộ khóa học");
          }
          if (res.status != 200) {
            this.notifyService.error(res.error);
          }
          this.isConfirmLoading = false;
          this.modalRef.close(true);
        })
        break;
      case SubmitTypeEnum.ENROLL:
        this.service.submitEnroll(this.listId, this.courseId).subscribe(res => {
          if (res.status == 200) {
            this.notifyService.success("Đồng bộ đăng ký");
          }
          if (res.status != 200) {
            this.notifyService.error(res.error);
          }
          this.isConfirmLoading = false;
          this.modalRef.close(true);
        })
        break;
      default:
        break;
    }

  }

  handleCancel(): void {
    this.isVisible = false;
    this.modalRef.close();
  }


}
