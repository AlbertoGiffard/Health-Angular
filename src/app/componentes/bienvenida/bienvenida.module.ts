import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaRoutingModule } from './bienvenida-routing.module';
import { BienvenidaComponent } from './bienvenida.component';
import { CargandoModule } from '../cargando/cargando.module';
import { siSharedModule } from 'src/app/directivas/siShared.module';


@NgModule({
  declarations: [
    BienvenidaComponent
  ],
  imports: [
    CommonModule,
    BienvenidaRoutingModule,
    CargandoModule,
    siSharedModule
  ]
})
export class BienvenidaModule { }
