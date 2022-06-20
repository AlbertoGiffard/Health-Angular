import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PacienteComponent } from 'src/app/clases/paciente/paciente.component';

@Component({
  selector: 'app-historia-paciente',
  templateUrl: './historia-paciente.component.html',
  styleUrls: ['./historia-paciente.component.scss'],
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
export class HistoriaPacienteComponent implements OnInit {
  @Input() lanzarAnimacion: boolean;
  @Input() paciente: PacienteComponent;
  @Output() cerrarForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  isOpen: boolean;

  constructor() {
    this.lanzarAnimacion = true;
    this.paciente = new PacienteComponent();
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
