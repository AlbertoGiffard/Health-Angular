import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {
  id: string;
  tipo: string = 'paciente';
  estado: string = 'pendiente';
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  obraSocial: string;
  email: string;
  password: string;
  imagenUno: string;
  ImagenDos: string;

  constructor() { 
    this.id = '';
    this.nombre = '';
    this.apellido = '';
    this.edad = 0;
    this.dni = 0;
    this.obraSocial = '';
    this.email = '';
    this.password = '';
    this.imagenUno = '';
    this.ImagenDos = '';
  }

  setValues(nombre:string, apellido:string, edad:number, dni: number, obraSocial: string, email: string, password: string, imagenUno: string, ImagenDos: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
    this.obraSocial = obraSocial;
    this.email = email;
    this.password = password;
    this.imagenUno = imagenUno;
    this.ImagenDos = ImagenDos;
  }

  ngOnInit(): void {
  }

}
