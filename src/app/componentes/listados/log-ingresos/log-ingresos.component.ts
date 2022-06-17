import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-log-ingresos',
  templateUrl: './log-ingresos.component.html',
  styleUrls: ['./log-ingresos.component.scss']
})
export class LogIngresosComponent implements OnInit {
  @Input() listaIngresosOriginal: any[];

  constructor(private firestore: FirestoreService) {
    this.listaIngresosOriginal = [];
   }

  ngOnInit(): void {
  }

}
