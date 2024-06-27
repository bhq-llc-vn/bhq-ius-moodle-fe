import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportOneRoutingModule } from './report-one-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ShareModule } from 'src/app/_share/share.module';
import { IconsProviderModule } from 'src/app/_theme/iconsProvider.module';
import { NgZorroModule } from 'src/app/_theme/ng-zorro.module';
import { ReportOneComponent } from './report-one.component';


@NgModule({
  declarations: [
    ReportOneComponent
  ],
  imports: [
    CommonModule,
    ReportOneRoutingModule,
    IconsProviderModule,
    NgZorroModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CurrencyMaskModule,
    HighchartsChartModule,
    ShareModule,
  ]
})
export class ReportOneModule { }
