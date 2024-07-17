import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareService } from './share.service';
import { StateTaskPipe } from './pipe/state-task.pipe';
import { TestDirective } from './directive/test.directive';
import { ValueArrayPipe } from './pipe/value-array.pipe';
import { HasPermissionDirective } from './directive/has-permission.directive';
import { BaseModule } from '../_base/base.module';
import { StoreDataModule } from '../_base/store-data.module';
import { RecordStatePipe } from './pipe/record-state.pipe';



@NgModule({
  declarations: [
    StateTaskPipe,
    TestDirective,
    ValueArrayPipe,
    HasPermissionDirective,
    RecordStatePipe,
  ],
  imports: [
    CommonModule,
    StoreDataModule
  ],
  exports: [
    HasPermissionDirective,
    TestDirective,
    StateTaskPipe,
    ValueArrayPipe,
    RecordStatePipe
  ],
  providers: [
    ShareService,
  ]
})
export class ShareModule { }
