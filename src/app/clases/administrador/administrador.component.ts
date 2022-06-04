import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {
  id: string;
  tipo: string = 'administrador';
  estado: string = 'validado';
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  email: string;
  password: string;
  imagen: string;

  constructor() { 
    this.id = '';
    this.nombre = '';
    this.apellido = '';
    this.edad = 0;
    this.dni = 0;
    this.email = '';
    this.password = '';
    this.imagen = '';
  }

  setValues(nombre:string, apellido:string, edad:number, dni: number, email: string, password: string, imagen: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
    this.email = email;
    this.password = password;
    this.imagen = imagen;
  }

  ngOnInit(): void {
  }

}
