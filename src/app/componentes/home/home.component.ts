import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuario: any;
  componenteMostrar:string;
  tipoUsuario:string;

  constructor(private router: Router, private loginServicio: LoginService) {
    this.componenteMostrar = ''; //esto debe ir vacio
    this.tipoUsuario = '';
  }

  ngOnInit() {
      this.usuario = this.loginServicio.traerUsuarioActual();
      if (this.usuario) {
        this.tipoUsuario = this.usuario.tipo;             
      }
  }

  listarEspecialistas(){
    this.componenteMostrar = 'listadoPacientes';
  }
  crearAdministrador(){
    this.componenteMostrar = 'registrarAdministrador';
  }

  filtrarTurnos(){
    
  }
}
