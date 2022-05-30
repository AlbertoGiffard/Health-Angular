import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargandoRoutingModule } from './cargando-routing.module';
import { CargandoComponent } from './cargando.component';


@NgModule({
  declarations: [
    CargandoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CargandoComponent
  ]
})
export class CargandoModule { }
