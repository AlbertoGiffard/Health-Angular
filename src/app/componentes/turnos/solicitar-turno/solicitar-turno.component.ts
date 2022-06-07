import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecialistaComponent } from 'src/app/clases/especialista/especialista.component';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { DateAdapter } from '@angular/material/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
  fechaMinima: Date;
  fechaMaxima: Date;
  hora: string;
  especialidadEscogida:string;
  listaEspecialidades: string[];
  listaEspecialistas: EspecialistaComponent[];
  listaEspecialistasMostrar: EspecialistaComponent[];
  formulario: FormGroup;
  fb: FormBuilder;

  constructor(private firestore: FirestoreService, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.especialidadEscogida = 'Escoger especialidad';
    const anioActual = new Date().getFullYear();
    const diaActual = new Date().getDay();
    this.fechaMinima = new Date();
    this.fechaMaxima = new Date();
    this.fechaMaxima.setDate(this.fechaMaxima.getDate() + 15);
    this.hora = '';
    this.listaEspecialidades = [];
    this.listaEspecialistas = [];
    this.listaEspecialistasMostrar = [];
    this.fb = new FormBuilder();
    this.formulario = this.fb.group(
      {
        'hora': [Validators.required]
      }
    );
  }

  ngOnInit(): void {
    //agrega las lista de especialistas y especialidades
    this.firestore.getEspecialistas().subscribe(listDoc => {
      this.listaEspecialistas = listDoc;
      
      this.listaEspecialistas.forEach((value: any) => {
        if (this.listaEspecialidades.indexOf(value.especialidad) == -1) this.listaEspecialidades.push(value.especialidad);
      });
    });
  }

  lista() {
    console.log(this.listaEspecialidades);
  }

  subirTurno(){
    console.log(this.formulario.controls['hora'].value);
  }

  getValorDropdown($event:any) {
    console.log($event.view.getSelection().anchorNode.parentElement.innerText);
    this.especialidadEscogida = $event.view.getSelection().anchorNode.parentElement.innerText;
    
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const dia = event.value?.getDate();
    var mes = event.value?.getMonth();
    if (mes != undefined) {
      mes++;
    }
    const anio = event.value?.getFullYear();
    
    console.log(`${dia}/${mes}/${anio}`);   
  }

}
