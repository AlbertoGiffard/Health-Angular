import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacienteComponent } from '../formulario/paciente/paciente.component';


@NgModule({
  declarations: [
    RegistroComponent,
    PacienteComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegistroModule { }
