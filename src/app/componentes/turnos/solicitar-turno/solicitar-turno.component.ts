import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecialistaComponent } from 'src/app/clases/especialista/especialista.component';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { LoginService } from 'src/app/servicios/login.service';
import { PacienteComponent } from 'src/app/clases/paciente/paciente.component';
import Swal from 'sweetalert2';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import * as moment from 'moment';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
  usuario: any;
  paciente: PacienteComponent;
  especialista: any;
  fechaMinima: Date;
  fechaMaxima: Date;
  hora: string;
  especialidadEscogida: string;
  pacienteEscogido: string;
  doctorEscogido: string;
  horaEscogida: string;
  diaEscogido: string;
  listaEspecialidades: string[];
  listaDiasMostrar: string[];
  listaEspecialistas: EspecialistaComponent[];
  listaEspecialistasMostrar: EspecialistaComponent[];
  listaHorasDisponibles: number[];
  listaPacientes: PacienteComponent[];
  formulario: FormGroup;
  fb: FormBuilder;
  botonDoctor:boolean;
  botonDia:boolean;
  botonHora:boolean;

  constructor(private firestore: FirestoreService, private dateAdapter: DateAdapter<Date>, private loginServicio: LoginService) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.especialidadEscogida = 'Escoger especialidad';
    this.pacienteEscogido = 'Escoger paciente';
    this.doctorEscogido = 'Escoger doctor';
    this.horaEscogida = '00:00';
    this.diaEscogido = 'dd/mm/yyyy';
    this.fechaMinima = new Date();
    this.fechaMaxima = new Date();
    this.fechaMaxima.setDate(this.fechaMaxima.getDate() + 15);
    this.hora = '';
    this.listaEspecialidades = [];
    this.listaEspecialistas = [];
    this.listaEspecialistasMostrar = [];
    this.listaDiasMostrar = [];
    this.listaPacientes = [];
    this.listaHorasDisponibles = [];
    this.paciente = new PacienteComponent;
    this.especialista = new EspecialistaComponent;
    this.fb = new FormBuilder();
    this.formulario = this.fb.group(
      {
        'hora': [Validators.required]
      }
    );
    this.botonDoctor = false;
    this.botonDia = false;
    this.botonHora = false;
  }

  ngOnInit(): void {
    this.traerUsuarioActual();
    
    //agrega las lista de especialistas y especialidades
    this.firestore.getTipoUsuarios('especialista').subscribe(listDoc => {
      this.listaEspecialistas = listDoc;

      this.listaEspecialistas.forEach((value: any) => {
        if (this.listaEspecialidades.indexOf(value.especialidad) == -1) this.listaEspecialidades.push(value.especialidad);
      });
    });
  }

  traerUsuarioActual() {
    //esto es lo que realmente va
    this.usuario = this.loginServicio.traerUsuarioActual();
    this.usuario.id = this.usuario.uid;
    /* 
    this.firestore.actualizarUsuario(this.usuario).then(() => {
    });*/
    
    
    

    //esto se debe borrar
    /* this.usuario = {
      ImagenDos: "https://firebasestorage.googleapis.com/v0/b/clinica-giffard.appspot.com/o/4.jpg?alt=media&token=f4c141a3-b896-4e31-8de0-b84ec8f88b3c",
      apellido: "Gordon",
      dni: 45852147,
      edad: 26,
      email: "pacientedos@gmail.com",
      estado: "validado",
      id: "",
      imagenUno: "https://firebasestorage.googleapis.com/v0/b/clinica-giffard.appspot.com/o/pacientedos.jpg?alt=media&token=f5c317da-688c-468f-a4da-b912b1061290",
      nombre: "Barbara",
      obraSocial: "osecac",
      password: "123456",
      tipo: "paciente",
      uid: "RbtMAwB6EcSMfVokphBy"
    } */

    if (this.usuario.tipo == 'administrador') {
      this.firestore.getTipoUsuarios('paciente').subscribe(listDoc => {
        this.listaPacientes = listDoc;
      })
    } else {
      this.paciente = this.usuario;
    }
  }

  subirTurno() {
    if (this.especialidadEscogida != 'Escoger especialidad' && this.doctorEscogido != 'Escoger doctor' && this.horaEscogida != '00:00' && this.diaEscogido != 'dd/mm') {
      if (this.usuario.tipo == 'administrador') {
        if (this.pacienteEscogido != 'Escoger paciente') {
          this.crearYEnviarTurno(this.paciente, this.especialidadEscogida, this.especialista.doctor, this.diaEscogido, this.horaEscogida);

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Falta completar campos.',
          });
        }
      } else {
        this.crearYEnviarTurno(this.paciente, this.especialidadEscogida, this.especialista.doctor, this.diaEscogido, this.horaEscogida);        
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Falta completar campos.',
      });
    }
  }

  getValorDropdown($event: any, tipo: string) {
    switch (tipo) {
      case 'paciente':
        this.pacienteEscogido = $event.view.getSelection().anchorNode.parentElement.innerText;
        break;

      case 'especialidad':
        this.especialidadEscogida = $event.view.getSelection().anchorNode.parentElement.innerText;
        this.listaHorasDisponibles = [];
        this.horaEscogida = '00:00';
        this.doctorEscogido = 'Escoger doctor';
        this.listaEspecialistasMostrar = [];
        this.listaEspecialistas.forEach(doctor => {
          if (doctor.especialidad == this.especialidadEscogida) {
            this.listaEspecialistasMostrar.push(doctor);
          }
        });
        this.botonDoctor = true;
        this.botonDia = false;
        this.botonHora = false;
        break;

      case 'doctor':
        this.doctorEscogido = $event.view.getSelection().anchorNode.parentElement.innerText;
        this.botonDoctor = true;
        this.botonDia = true;
        this.botonHora = false;
        break;

      case 'dia':
        this.diaEscogido = $event.view.getSelection().anchorNode.parentElement.innerText;
        this.botonDoctor = true;
        this.botonDia = true;
        this.botonHora = true;
        break;

      case 'hora':
        this.horaEscogida = $event.view.getSelection().anchorNode.parentElement.innerText;
        break;
    }

  }

  getDoctor(especialista: any) {
    this.especialista = especialista;
    const valorDesde = especialista.doctor.desde.split(':');
    const valorHasta = especialista.doctor.hasta.split(':');
    const valorDesdeNumerico = parseInt(valorDesde[0]);
    const valorHastaNumerico = parseInt(valorHasta[0]);


    for (let i = 0; i < 25; i++) {
      if (valorHastaNumerico >= i && i >= valorDesdeNumerico) {
        this.listaHorasDisponibles.push(i);
      }
    }
  }

  getDias() {
    const fecha = moment(new Date());

    for (let i = 0; i < 15; i++) {
      let fechaAux = fecha.add(1, 'days');
      this.listaDiasMostrar.push(fechaAux.format("DD/MM/YYYY"));
    }   
  }

  getPaciente(paciente: any) {
    if (this.usuario.tipo == 'administrador') {
      this.paciente = paciente;
    }
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const dia = event.value?.getDate();
    var mes = event.value?.getMonth();
    if (mes != undefined) {
      mes++;
    }
    const anio = event.value?.getFullYear();

    this.diaEscogido = moment(new Date(`${anio}/${mes}/${dia}`)).format("YYYY-MM-DD");
     
  }

  limpiarCampos() {
    this.especialidadEscogida = 'Escoger especialidad';
    this.pacienteEscogido = 'Escoger paciente';
    this.doctorEscogido = 'Escoger doctor';
    this.diaEscogido = 'dd/mm';
    this.horaEscogida = '00:00';
  }

  crearYEnviarTurno(paciente: PacienteComponent, especialidad: string, especialista: any, dia: string, hora: string) {
    let turno = new TurnoComponent();
    
    turno.setValores(paciente, especialidad, especialista, dia, hora);

    this.firestore.guardarTurno(turno).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Turno creado con éxito.'
      });
      this.limpiarCampos();
    })
    
  }

}
