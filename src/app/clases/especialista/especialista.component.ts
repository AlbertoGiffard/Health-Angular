import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.scss']
})
export class EspecialistaComponent implements OnInit {
  tipo: string = 'especialista';
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  especialidad: string;
  mail: string;
  password: string;
  imagenUno: string;

  constructor() { 
    this.nombre = '';
    this.apellido = '';
    this.edad = 0;
    this.dni = 0;
    this.especialidad = '';
    this.mail = '';
    this.password = '';
    this.imagenUno = '';
  }

  setValues(nombre:string, apellido:string, edad:number, dni: number, especialidad: string, mail: string, password: string, imagenUno: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
    this.especialidad = especialidad;
    this.mail = mail;
    this.password = password;
    this.imagenUno = imagenUno;
  }

  ngOnInit(): void {
  }

}
