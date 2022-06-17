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
import { AdministradorTurnoComponent } from '../listados/administrador-turno/administrador-turno.component';
import { MisTurnosComponent } from '../turnos/mis-turnos/mis-turnos.component';
import { PacienteMisTurnosComponent } from '../turnos/paciente-mis-turnos/paciente-mis-turnos.component';
import { FormHistoriaClinicaComponent } from '../formulario/form-historia-clinica/form-historia-clinica.component';

import {MatIconModule} from '@angular/material/icon';
import { MisPacientesComponent } from '../mis-pacientes/mis-pacientes.component';
import { HistoriaTurnoComponent } from '../mis-pacientes/historia-turno/historia-turno.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { CargandoModule } from '../cargando/cargando.module';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';
import { NgChartsModule } from 'ng2-charts';
import { LogIngresosComponent } from '../listados/log-ingresos/log-ingresos.component';
import { CurvaComponent } from '../graficos/curva/curva.component';




@NgModule({
  declarations: [
    HomeComponent,
    EspecialistasPendientesComponent,
    FormAdministradorComponent,
    PerfilComponent,
    SolicitarTurnoComponent,
    AdministradorTurnoComponent,
    MisTurnosComponent,
    PacienteMisTurnosComponent,
    FormHistoriaClinicaComponent,
    MisPacientesComponent,
    HistoriaTurnoComponent,
    UsuariosComponent,
    EstadisticasComponent,
    LogIngresosComponent,
    CurvaComponent
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
    MatNativeDateModule,
    CargandoModule,
    NgChartsModule
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
