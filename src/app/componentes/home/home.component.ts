import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('inOut', [
      transition('void => *', [
        query('div', style({ opacity: 0 })),
        query('span', style({ opacity: 0 })),
        query('div', animate('500ms',
          style({ opacity: 1 })
        )),
        query('span', animate('1000ms',
          style({ opacity: 1 })
        )),
      ]),
      transition('* => void', [
        animate('500ms',
          style({ opacity: 0 })
        )
      ])
    ])
  ],
})
export class HomeComponent implements OnInit {
  @Input() paraMostrar: boolean;
  usuario: any;
  componenteMostrar: string;
  tipoUsuario: string;

  constructor(private router: Router, private loginServicio: LoginService) {
    this.paraMostrar = false;
    this.componenteMostrar = ''; //esto debe ir vacio
    this.tipoUsuario = '';
  }

  ngOnInit() {
    //esto es lo que realmente va
    //this.usuario = this.loginServicio.traerUsuarioActual();


    this.usuario = {
      apellido: "Rik",
      dni: 96458741,
      edad: 51,
      email: "vision@gmail.com",
      estado: "validado",
      id: "",
      imagen: "https://firebasestorage.googleapis.com/v0/b/clinica-giffard.appspot.com/o/administrador.jpg?alt=media&token=46a106b0-3161-4235-b7d1-b9d200cc7524",
      nombre: "Dr. Vision",
      password: "123456",
      tipo: "administrador",
      uid: "HYp7g56XcossWQBH3zd7"
    };

    //esto si va

    if (this.usuario) {
      this.tipoUsuario = this.usuario.tipo;
    }
  }

  renderizar = (mostrar: boolean) => {
    this.paraMostrar = !mostrar;
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

  turnosAdministrador() {
    this.componenteMostrar = 'turnosAdministrador';
  }

  irMisTurnos() {
    this.componenteMostrar = 'misTurnos';
  }

  irMisPacientes() {
    this.componenteMostrar = 'misPacientes';
  }

  irUsuarios() {
    this.componenteMostrar = 'usuarios';
  }

  irEstadisticas() {
    this.componenteMostrar = 'estadisticas';
  }
}
