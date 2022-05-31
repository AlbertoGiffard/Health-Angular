import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormEspecialistaComponent } from '../formulario/form-especialista/form-especialista.component';
import { FormPacienteComponent } from '../formulario/form-paciente/form-paciente.component';


@NgModule({
  declarations: [
    RegistroComponent,
    FormPacienteComponent,
    FormEspecialistaComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegistroModule { }
