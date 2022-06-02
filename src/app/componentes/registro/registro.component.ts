import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public tipo: string;
  public paciente: boolean;

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor() {
    this.tipo = 'Paciente';
    this.paciente = true;
  }

  ngOnInit(): void {
  }

  MostrarForm(paciente: boolean) {
    if (paciente) {
      this.tipo = 'Paciente';
      this.paciente = true;
    } else {
      this.tipo = 'Especialista';
      this.paciente = false;      
    }
  }
}
