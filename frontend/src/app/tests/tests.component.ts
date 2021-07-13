import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Users } from './Users';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  events: any[] = [Users];

  constructor(
    private server: ServerService,
    private sanitizer: DomSanitizer) { }

    ngOnInit() {
      this.getFailTests();
    }

  private getFailTests(){
    this.server.getFailTests().then((response: any) => {
      console.log('Response', response);
      this.events = response.map((ev) => {
        ev.description = ev.date;
        ev.body = ev.name; 
        return ev;
      });
    });
  }

 
  
}
