import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-torta',
  templateUrl: './torta.component.html',
  styleUrls: ['./torta.component.scss']
})
export class TortaComponent implements OnInit {
  @Input() listaData: string[];
  @Input() cantidadData: any[];
  @Input() titulo: string;
  pieChartData: ChartDataset[];
  pieChartLabels: string[];
  pieChartOptions: (ChartOptions);
  pieChartLegend: boolean;
  pieChartType: ChartType;

  constructor() {
    this.listaData = [];
    this.cantidadData = [];
    this.titulo = 'Datos';
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.pieChartOptions = {};
    this.pieChartLegend = true;
    this.pieChartType = 'pie';
   }

  ngOnInit(): void {
    
    this.pieChartData = [
      {
        data: this.cantidadData,
        label: this.titulo,
        fill: 'origin'
      },
    ];
    this.pieChartLabels = this.listaData;
    this.pieChartOptions = {
      responsive: false
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['cantidadData'].previousValue) {
      setTimeout(() => {
        this.pieChartData = [
          {
            data: changes['cantidadData'].currentValue,
            label: this.titulo,
            fill: 'origin'
          },
        ];
        this.pieChartLabels = changes['listaData'].currentValue;      
      }, 1500);
    }
  }

}
