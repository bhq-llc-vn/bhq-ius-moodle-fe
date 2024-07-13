import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ModeModal } from 'src/app/_core/enum/modeModal';
import { UserModel } from 'src/app/_core/model/user';
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

  passwordVisible = false;


  modalOptions: any = {
    nzDuration: 2000,
  };

  constructor(
    private element: ElementRef,
    private fb: FormBuilder,
    private service: UserData,
    private modal: NzModalService,
    private notifyService: NzNotificationService,
    private modelRef: NzModalRef<UserFormComponent>
  ) { }

  get username() {
    return this.formValidation.get('username');
  }

  get fullName() {
    return this.formValidation.get('fullName');
  }

  get email() {
    return this.formValidation.get('email');
  }

  get password() {
    return this.formValidation.get('password');
  }

  get phone() {
    return this.formValidation.get('phone');
  }

  get checkPassword() {
    return this.formValidation.get('checkPassword');
  }




  ngOnInit(): void {
    this.formValidation = this.fb.group({
      id:['',[]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      fullName: ['', [Validators.required]],
      phone: ['', [
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(9),
        Validators.maxLength(11),
      ],],
      email: ['', []],
    });

    if (this.mode != ModeModal.CREATE) {
      if (this.id) {
        this.getById(this.id);
      }
    }

  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.formValidation.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.formValidation.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };



  changeChecked() {
    this.checked = !this.checked;
  }

  getById(id: number) {
    this.service.getById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.formValidation.setValue({
          id: res.data.id,
          fullName: res.data.fullName,
          password: res.data.password,
          checkPassword: res.data.password,
          email: res.data.email,
          phone: res.data.phone,
          username: res.data.username,
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
