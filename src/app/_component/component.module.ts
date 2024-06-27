import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../_share/share.module';
import { NgZorroModule } from '../_theme/ng-zorro.module';
import { InputFileComponent } from './input-file/input-file.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ConfirmFormComponent } from './confirm-form/confirm-form.component';


@NgModule({
  declarations: [
    InputFileComponent,
    ProgressBarComponent,
    NotFoundComponent,
    UploadFileComponent,
    ConfirmFormComponent
  ],
  imports: [
    CommonModule,
    // ShareModule,
    NgZorroModule.forRoot()
  ],
  exports: [
    InputFileComponent,
    ProgressBarComponent,
    NotFoundComponent
  ]
})
export class ComponentModule { }
