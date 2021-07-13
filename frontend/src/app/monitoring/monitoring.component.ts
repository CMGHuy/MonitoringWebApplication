import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { DatePipe } from '@angular/common';

export class TestProgress {
  constructor(
    public instanceIP: string,
    public description: string,
    public progress: number,
    public passed: number,
    public failed: number,
    public done: number,
    public remained: number,
    public assigned: number,
//     date = new Date()
    public date: string
  ) {
  }
}

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

  events: any[] = [];
  modalCallback: () => void;

  testProgressList : TestProgress[];
  summarizedProgress: TestProgress;

  constructor(
    private server: ServerService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {

  }

  showAllProgresses() {
    this.server.getTestProgress().then((response: any) => {
      console.log('All test progresses:', response);
      this.testProgressList = response;
//       this.testProgressList = this.testProgressList.sort((a, b) => (a.instanceIP < b.instanceIP ? -1 : 1));
      this.testProgressList = this.testProgressList.sort((a, b) => {
        const num1 = Number(a.instanceIP.split(".").map((num) => (`000${num}`).slice(-3) ).join(""));
        const num2 = Number(b.instanceIP.split(".").map((num) => (`000${num}`).slice(-3) ).join(""));
        return num1-num2;
      });
    });
    console.log("All test progresses");

    this.server.getTotalProgress().then((response: any) => {
      console.log('Summarized test progress:', response);
      // The API response is an array of json, even there's only 1 json.
      this.summarizedProgress = response[0];
    });
    console.log("Summarized test progress");
  }
}
