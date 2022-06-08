import { Component, OnInit } from '@angular/core';
import { PacienteComponent } from 'src/app/clases/paciente/paciente.component';
import { EspecialistaComponent } from 'src/app/clases/especialista/especialista.component';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent implements OnInit {
  paciente: PacienteComponent;
  especialidad: string;
  especialista: EspecialistaComponent;
  dia: string;
  hora: string;
  estado: string;
  comentario: string;
  resenia: string;

  constructor() { 
    this.paciente = new PacienteComponent;
    this.especialidad = '';
    this.especialista = new EspecialistaComponent;
    this.dia = '';
    this.hora = '';
    this.estado = 'pendiente';
    this.comentario = '';
    this.resenia = '';
  }

  ngOnInit(): void {
  }

  setValores(paciente: PacienteComponent, especialidad: string, especialista: any, dia: string, hora: string){
    this.paciente = paciente;
    this.especialidad = especialidad;
    this.especialista = especialista;
    this.dia = dia;
    this.hora = hora;
    this.estado = 'pendiente';
    this.comentario = '';
    this.resenia = '';
  }

}
