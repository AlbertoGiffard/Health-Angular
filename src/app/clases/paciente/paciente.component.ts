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
  altura: number;
  peso: number;
  temperatura: number;
  presion: number;
  campoDinamicoUno: any;
  campoDinamicoDos: any;
  campoDinamicoTres: any;

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
    this.altura = 0;
    this.peso = 0;
    this.temperatura = 0;
    this.presion = 0;
    this.campoDinamicoUno = 0;
    this.campoDinamicoDos = 0;
    this.campoDinamicoTres = 0;
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
