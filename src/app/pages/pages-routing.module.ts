import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../_component/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { PermissionGuardService } from '../_base/guard/permission-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    // canActivateChild: [PermissionGuardService],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
        
      },
      {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.module').then((m) => m.WelcomeModule),
      },
      {
        path: 'report-one',
        loadChildren: () => import('./report-one/report-one.module').then((m) => m.ReportOneModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
