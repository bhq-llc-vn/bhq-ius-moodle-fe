import { Component, OnInit } from '@angular/core';
import { ShareService } from './_share/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bhq-ius-moodle';

  constructor() {

  }

  ngOnInit(): void {

  }

}
