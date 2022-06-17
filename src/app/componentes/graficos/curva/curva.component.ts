import { Component, Input, OnInit } from '@angular/core';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-curva',
  templateUrl: './curva.component.html',
  styleUrls: ['./curva.component.scss']
})
export class CurvaComponent implements OnInit {
  @Input() listaTurnos: TurnoComponent[];
  @Input() desde: string;
  @Input() hasta: string;
  
  lineChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];

  constructor() {
    this.listaTurnos = [];
    this.desde = '';
    this.hasta = '';
   }

  ngOnInit(): void {
  }

}
