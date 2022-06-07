import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuario: any;
  componenteMostrar: string;
  tipoUsuario: string;

  constructor(private router: Router, private loginServicio: LoginService) {
    this.componenteMostrar = ''; //esto debe ir vacio
    this.tipoUsuario = '';
  }

  ngOnInit() {
    //esto es lo que realmente va
    //this.usuario = this.loginServicio.traerUsuarioActual();

    this.usuario = {
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
    }

    //esto si va

    if (this.usuario) {
      this.tipoUsuario = this.usuario.tipo;
    }
  }

  listarEspecialistas() {
    this.componenteMostrar = 'listadoPacientes';
  }
  crearAdministrador() {
    this.componenteMostrar = 'registrarAdministrador';
  }

  irPerfil() {
    this.componenteMostrar = 'perfil';
  }

  irSolicitarTurno() {
    this.componenteMostrar = 'solicitarTurno';
  }
}
