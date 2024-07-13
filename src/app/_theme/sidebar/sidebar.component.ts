import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BinarySearchService } from 'src/app/_base/util';
import { ModeModal } from 'src/app/_core/enum/modeModal';


@Component({
  selector: 'internal-app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnChanges {
  isCollapsed = false;

  isActive = false;

  isHidden = false;

  isOpen = false;


  @Input() menuInfo: any;
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('popupContent') popupContent!: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private binarySearch: BinarySearchService
  ) {
    // do something
    // this.menuInfo = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes['menuInfo'] && changes['menuInfo'].currentValue) {
      this.menuInfo = changes['menuInfo'].currentValue;
    }
  }

  ngOnInit(): void {
    console.log(this.menuInfo)
  }



  subMenu(item?: any) {
    // debugger;
    this.binarySearch.binarySearchTreeArray(this.menuInfo, 'children', item.id);
    const result = this.binarySearch.result;
    let subMenu = this.elementRef.nativeElement.querySelector('.sub-menu');
    console.log(subMenu);
    if (subMenu.classList.contains('d-none')) {
      subMenu.classList.remove('hide');
      subMenu.classList.remove('d-none');
      subMenu.classList.add('show');
      subMenu.classList.add('d-block');
      result.isOpen = !result.isOpen;
      console.log(result);
      // this.isOpen = !this.isOpen;
    } else if (subMenu.classList.contains('d-block')) {
      subMenu.classList.remove('show');
      subMenu.classList.remove('d-block');
      subMenu.classList.add('hide');
      result.isOpen = !result.isOpen;
      console.log(result);
      // this.isOpen = !this.isOpen;
      setTimeout(() => {
        return subMenu.classList.add('d-none');
      }, 300);
    }
  }


}
