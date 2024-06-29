import { Injectable } from '@angular/core';
import { menuItem } from '../pages/page';

@Injectable()
export class PageMenuService {

  constructor() { }

  getMenu(items: any[], menu: any[]): any[] {
    // debugger;
    menu = menu.filter(item => items.includes(item.code));
    menu.forEach((v, k) => {
      if (v.children && v.children.length > 0) {
        v.isOpen = false;
        this.getMenu(items, v.children);
      }
    });

    return menu;
  }



}
