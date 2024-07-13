import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-confirm-form',
  templateUrl: './confirm-form.component.html',
  styleUrls: ['./confirm-form.component.scss']
})
export class ConfirmFormComponent implements OnInit {

  @Input() title: string = '';
  @Input() data: string = '';

  isVisible = false;
  isConfirmLoading = false;

  constructor(private modalRef: NzModalRef<ConfirmFormComponent>) {}


  ngOnInit(): void {
    this.data = 'Bạn có chắc muốn xóa ????';
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    this.modalRef.close(true);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.modalRef.close();
  }

}
