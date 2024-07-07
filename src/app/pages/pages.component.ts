import { Component, OnInit } from '@angular/core';
import { UserData } from '../_core/api/user/user-data';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { ResponseStatusEnum } from '../_core/enum/response-status-enum';
import { PageMenuService } from './page-menu.service';
import { menuCodeUser, menuCodeAdmin, menuItem } from './page';
import { StoreDataService } from '../_base/store-data.service';
import { ShareService } from '../_share/share.service';

@Component({
  selector: 'app-pages',
  template: `
  <internal-app-layout>
  <internal-app-sidebar [menuInfo]="getMenuInfo"></internal-app-sidebar>
  <internal-app-header></internal-app-header>
  <router-outlet></router-outlet>
  <internal-app-footer></internal-app-footer>
  </internal-app-layout>
  `,
})
export class PagesComponent implements OnInit {

  private userInfo: any;
  public menuInfo: any;
  private username: any;
  private permissions: any;

  get getUserInfo() {
    return this.userInfo;
  }

  get getMenuInfo() {
    return this.menuInfo;
  }

  get getPermissions() {
    return this.permissions;
  }

  constructor(private userService: UserData,
    private storeDataService: StoreDataService,
    private pageService: PageMenuService) {
    let helper = new JwtHelperService();
    let token: any = localStorage.getItem('access_token');
    this.username = (helper.decodeToken(token)) ? helper.decodeToken(token).sub : '';
  }

  ngOnInit() {
    if(this.username == 'adminbhq') {
      this.menuInfo = this.pageService.getMenu(menuCodeAdmin, menuItem);
    } else {
      this.menuInfo = this.pageService.getMenu(menuCodeUser, menuItem);
    }
    this.storeDataService.menuInfoData.next(this.menuInfo);
    console.log(this.menuInfo);
  }

}
