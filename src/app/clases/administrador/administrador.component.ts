import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {
  tipo: string = 'administrador';
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  mail: string;
  password: string;
  imagenUno: string;

  constructor() { 
    this.nombre = '';
    this.apellido = '';
    this.edad = 0;
    this.dni = 0;
    this.mail = '';
    this.password = '';
    this.imagenUno = '';
  }

  setValues(nombre:string, apellido:string, edad:number, dni: number, mail: string, password: string, imagenUno: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
    this.mail = mail;
    this.password = password;
    this.imagenUno = imagenUno;
  }

  ngOnInit(): void {
  }

}
