import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { IconsProviderModule } from 'src/app/_theme/iconsProvider.module';
import { NgZorroModule } from 'src/app/_theme/ng-zorro.module';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    IconsProviderModule.forRoot(),
    NgZorroModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CurrencyMaskModule,
  ]
})
export class UserModule { }
