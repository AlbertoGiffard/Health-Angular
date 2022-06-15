import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';

@Component({
  selector: 'app-historia-turno',
  templateUrl: './historia-turno.component.html',
  styleUrls: ['./historia-turno.component.scss'],
  animations: [
    trigger('childAnimation', [
      // ...
      state('open', style({
        height: '350px',
        opacity: 1,
        backgroundColor: 'rgb(167,194,233)'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        backgroundColor: '#a8b3b3'
      })),
      transition('* => *', [
        animate('1s')
      ]),
    ]),
  ],
})
export class HistoriaTurnoComponent implements OnInit {
  @Input() lanzarAnimacion: boolean;
  @Input() turno: TurnoComponent;
  @Output() cerrarForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  isOpen: boolean;

  constructor() { 
    this.lanzarAnimacion = true;
    this.turno = new TurnoComponent();
    this.isOpen = true;
  }

  ngOnInit(): void {
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.lanzarAnimacion = !this.lanzarAnimacion;
    this.cerrarForm.emit(this.isOpen);
  }

}
