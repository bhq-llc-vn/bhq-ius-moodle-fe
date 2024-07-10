import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ReportOneData } from 'src/app/_core/api/report-one/report-one-data';
import { SubmitTypeEnum } from 'src/app/_core/enum/submit-type-enum';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss']
})
export class SubmitFormComponent implements OnInit {

  @Input() title: string = '';
  @Input() data: string = '';
  @Input() listId: number[] = [];
  @Input() type: string = '';

  isVisible = false;
  isConfirmLoading = false;

  constructor(private modalRef: NzModalRef<SubmitFormComponent>,
    private service: ReportOneData
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
      default:
        break;
    }

    if (this.listId.length > 0) {
      this.data = 'Bạn có chắc muốn đẩy DANH SÁCH ' + type + ' này không ?'
    } else {
      this.data = 'Bạn có chắc muốn đẩy TOÀN BỘ ' + type + ' không ?'
    }
  }

  ngOnInit(): void {
    // this.data = 'Bạn có chắc muốn xóa ????';
    this.buildMessage();
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    switch (this.type) {
      case SubmitTypeEnum.AVATAR:
        this.service.submitAvatar(this.listId).subscribe(res => {
          if (res.status == 200) {
            this.isConfirmLoading = false;
            this.modalRef.close(true);
          }
        })
        break;
      case SubmitTypeEnum.DRIVER:
        this.service.submitDriver(this.listId).subscribe(res => {
          if (res.status == 200) {
            this.isConfirmLoading = false;
            this.modalRef.close(true);
          }
        })
        break;
      case SubmitTypeEnum.COURSE:
        this.service.submitCourse(this.listId).subscribe(res => {
          if (res.status == 200) {
            this.isConfirmLoading = false;
            this.modalRef.close(true);
          }
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
