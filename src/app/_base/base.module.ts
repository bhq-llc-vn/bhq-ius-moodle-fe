import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { JwtInterceptorService } from './interceptor/jwt-interceptor.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NotifyService } from './notify.service';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { MessageService } from './message.service';
import { AuthGuardService } from './guard/auth-guard.service';
import { AuthService } from './auth.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { BinarySearchService } from './util';
import { StoreDataService } from './store-data.service';
import { PermissionGuardService } from './guard/permission-guard.service';
import { HasPermissionService } from './guard/has-permission.service';
import { StoreDataModule } from './store-data.module';

const PROVIDERS = [
  HttpService,
  AuthGuardService,
  AuthService,
  AuthenticationService,
  PermissionGuardService,
  HasPermissionService
]

const SERVICES = [
  NotifyService,
  MessageService,
  BinarySearchService
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreDataModule,
    NzNotificationModule,
    NzMessageModule
  ]
})
export class BaseModule {
  static forRoot(): ModuleWithProviders<BaseModule> {
    return {
      ngModule: BaseModule,
      providers: [
        ...PROVIDERS,
        ...SERVICES
      ]
    }
  }
}
