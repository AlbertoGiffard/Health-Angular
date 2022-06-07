import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { coloresDirectiveSharedModule } from 'src/app/directivas/coloresShared.module';
import { EspecialistasPendientesComponent } from '../listados/especialistas-pendientes/especialistas-pendientes.component';
import { FormAdministradorComponent } from '../formulario/form-administrador/form-administrador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { PerfilComponent } from '../perfil/perfil.component';
import { SolicitarTurnoComponent } from '../turnos/solicitar-turno/solicitar-turno.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';




@NgModule({
  declarations: [
    HomeComponent,
    EspecialistasPendientesComponent,
    FormAdministradorComponent,
    PerfilComponent,
    SolicitarTurnoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    coloresDirectiveSharedModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    }
  ]
})
export class HomeModule { }
