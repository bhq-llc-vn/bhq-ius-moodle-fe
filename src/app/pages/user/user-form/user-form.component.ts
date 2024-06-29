import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProjectData } from 'src/app/_core/api/project/project-data';
import { ModeModal } from 'src/app/_core/enum/modeModal';
import { UserModel } from 'src/app/_core/model/user';
import { DeleteComponent } from '../../project/delete/delete.component';
import { ProjectFormComponent } from '../../project/project-form/project-form.component';
import { SubProjectComponent } from '../../project/sub-project/sub-project.component';
import { UserData } from 'src/app/_core/api/user/user-data';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  formValidation!: FormGroup;
  isConfirmLoading = false;
  checked = false;
  isVisible = false;

  @Input() title: string = '';
  @Input() mode: string = '';
  @Input() id: number = 0;

  modalOptions: any = {
    nzDuration: 2000,
  };

  constructor(
    private element: ElementRef,
    private fb: FormBuilder,
    private service: UserData,
    private modal: NzModalService,
    private notifyService: NzNotificationService,
    private modelRef: NzModalRef<ProjectFormComponent>
  ) { }

  get username() {
    return this.formValidation.get('username');
  }

  get fullName() {
    return this.formValidation.get('username');
  }

  get email() {
    return this.formValidation.get('email');
  }

  get phone() {
    return this.formValidation.get('phone');
  }



  ngOnInit(): void {
    this.formValidation = this.fb.group({
      username: ['', []],
      password: ['', []],
      fullName: ['', []],
      phone: ['', []],
      email: ['', []],
      lastLoginTime: ['', []],
    });

    if (this.mode != ModeModal.CREATE) {
      if (this.id) {
        this.getById(this.id);
      }
    }

  }


  changeChecked() {
    this.checked = !this.checked;
  }

  getById(id: number) {
    this.service.getById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.formValidation.setValue({
          id: res.data.id,
          fullNname: res.data.fullName,
          email: res.data.email,
          phone: res.data.phone,
          username: res.data.username,
          lastLoginTime: res.data.lastLoginTime,
        });
      },
    });
  }



  handleOk(): void {
    // debugger;
    this.isConfirmLoading = true;
    const item: UserModel = this.formValidation.value;
    switch (this.mode) {
      case ModeModal.CREATE:
        this.service.save(item).subscribe({
          next: (res: UserModel) => {
            console.log(res);
            if (res) {
              this.isVisible = false;
              this.isConfirmLoading = false;
              this.modelRef.close(res);
            }
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {
            console.log('done');
          },
        });
        break;
      case ModeModal.UPDATE:
        this.service.update(this.id, item).subscribe({
          next: (res: UserModel) => {
            console.log(res);
            if (res) {
              this.isVisible = false;
              this.isConfirmLoading = false;
              this.modelRef.close(res);
            }
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {
            console.log('done');
          },
        });
        break;

      default:
        break;
    }
   
  }

  handleCancel(): void {
    this.isVisible = false;
    this.modelRef.close();
  }

}
