import { Component, Input, OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';


@Component({
  selector: 'app-curva',
  templateUrl: './curva.component.html',
  styleUrls: ['./curva.component.scss']
})
export class CurvaComponent implements OnInit {
  @Input() listaData: string[];
  @Input() cantidadData: any[];
  @Input() titulo: string;
  lineChartData: ChartDataset[];
  lineChartLabels: string[];
  lineChartOptions: (ChartOptions);
  lineChartLegend: boolean;
  lineChartType: ChartType;

  constructor() {
    this.listaData = [];
    this.cantidadData = [];
    this.titulo = 'Datos';
    this.lineChartData = [];
    this.lineChartLabels = [];
    this.lineChartOptions = {};
    this.lineChartLegend = true;
    this.lineChartType = 'line';
  }

  ngOnInit(): void {        
    this.lineChartData = [
      {
        data: this.cantidadData,
        label: this.titulo,
        borderColor: 'black',
        backgroundColor: 'rgba(13, 138, 221, 0.3)',
        fill: 'origin'
      },
    ];
    this.lineChartLabels = this.listaData;
    this.lineChartOptions = {
      responsive: false,
      elements: {
        line: {
          tension: 0.5
        }
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['cantidadData'].previousValue) {
      setTimeout(() => {
        this.lineChartData = [
          {
            data: changes['cantidadData'].currentValue,
            label: this.titulo,
            borderColor: 'black',
            backgroundColor: 'rgba(13, 138, 221, 0.3)',
            fill: 'origin'
          },
        ];
        this.lineChartLabels = changes['listaData'].currentValue;      
      }, 1500);
    }
  }
}
