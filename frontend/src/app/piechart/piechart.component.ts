import { Component, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})

export class PiechartComponent {

  @Input() pieChartData: number[];
  @Input() pieChartLegend: boolean;
  @Input() pieChartTitle: string = null;
  @Input() pieChartProgress: number;

  pieChartLabels: Label[] = ['Passed', 'Failed', 'Remained'];
  pieChartType: ChartType = 'pie';
  pieChartPlugins = [];
  pieChartColors: any = [{
     backgroundColor: ['rgb(151, 196, 230)', 'rgb(243, 113, 113)', 'rgb(247, 238, 160)'],
     borderColor: 'rgb(132, 132, 132)',
     // Color generator URL: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool
  }];
  pieChartOptions: ChartOptions = {
    responsive: true,
  };

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
}
