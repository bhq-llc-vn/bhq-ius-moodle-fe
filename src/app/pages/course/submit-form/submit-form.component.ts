import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ReportOneData } from 'src/app/_core/api/report-one/report-one-data';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.scss']
})
export class SubmitFormComponent implements OnInit {

  @Input() title: string = '';
  @Input() data: string = '';
  @Input() listId: number[] = [];

  isVisible = false;
  isConfirmLoading = false;

  constructor(private modalRef: NzModalRef<SubmitFormComponent>,
            private service: ReportOneData
  ) {}

  buildMessage() {
    if(this.listId.length > 0) {
      this.data = 'Bạn có chắc muốn đẩy NHỮNG BỘ HỒ SƠ này không ?'
    } else {
      this.data = 'Bạn có chắc muốn đẩy TOÀN BỘ HỒ SƠ không ?'
    }
  }

  ngOnInit(): void {
    // this.data = 'Bạn có chắc muốn xóa ????';
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    this.service.submitDriver(this.listId).subscribe(res => {
      if (res.status == 200) {
        this.isConfirmLoading = false;
      }
    })
    this.modalRef.close(true);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.modalRef.close();
  }

}
