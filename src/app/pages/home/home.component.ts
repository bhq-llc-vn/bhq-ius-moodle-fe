import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { MemberData } from 'src/app/_core/api/member/member-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public now = new Date();

  public listData: any;
  public listMember: any;
  public listTasks: any;

  public totalProject: number = 0;
  public totalTask: number = 0;

  public pageNumber = 1;
  public pageSize = 8;
  public txtSearch: string | undefined;

  isProjectHidden = false;
  isMemberHidden = false;
  isTaskHidden = false;

  constructor(
    private memberData: MemberData,
    private element: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
  
    this.refresh();
  }


  realTime() {
    setTimeout(() => {
      this.refresh();
    }, 1000);
  }

  refresh() {
    let a = new Date();
    let b = a.getHours( ) >= 12 ? ' PM' : ' AM';
    this.element.nativeElement.querySelector(
      '.date-time'
    ).innerHTML = `Ngày ${a.getDate()} tháng ${a.getMonth()+1} năm ${a.getFullYear()} - ${a.getHours()}:${a.getMinutes()} ${b}`;
    this.realTime();
  }
}
