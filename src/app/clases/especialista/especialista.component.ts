import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.scss']
})
export class EspecialistaComponent implements OnInit {
  id: string;
  tipo: string = 'especialista';
  estado: string = 'pendiente';
  nombre: string;
  apellido: string;
  edad: number;
  dni: number;
  especialidad: string;
  email: string;
  password: string;
  imagen: string;

  constructor() { 
    this.id = '';
    this.nombre = '';
    this.apellido = '';
    this.edad = 0;
    this.dni = 0;
    this.especialidad = '';
    this.email = '';
    this.password = '';
    this.imagen = '';
  }

  setValues(nombre:string, apellido:string, edad:number, dni: number, especialidad: string, email: string, password: string, imagen: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
    this.especialidad = especialidad;
    this.email = email;
    this.password = password;
    this.imagen = imagen;
  }

  ngOnInit(): void {
  }

}
