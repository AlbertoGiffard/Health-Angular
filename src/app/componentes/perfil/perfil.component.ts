import { Component, Input, OnInit } from '@angular/core';
import { extendMoment } from 'moment-range';
import { Moment } from 'moment';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @Input() usuario: any;
  imagenUno:string;
  imagenDos:string;
  desde: string;
  hasta: string;
  listadoTurnos:TurnoComponent[];
  listadoTurnosMostrar:TurnoComponent[];
  palabraBusqueda: string;
  turno: TurnoComponent;
  formHistoria: boolean;

  constructor(private firestore: FirestoreService) {
    this.imagenUno = '';
    this.imagenDos = '../../../assets/perfil/bg-perfil.jpg';
    this.desde = '';
    this.hasta = '';

    this.listadoTurnos = [];
    this.listadoTurnosMostrar = [];
    this.palabraBusqueda = '';
    this.turno = new TurnoComponent();
    this.formHistoria = false;
  }

  ngOnInit(): void {    
    if (this.usuario.imagen != undefined) {
      this.imagenUno = this.usuario.imagen;
    } else {
      this.imagenUno = this.usuario.imagenUno;
      this.imagenDos = this.usuario.ImagenDos;
    }
    if (this.usuario.tipo == 'especialista') {
      if (this.usuario.desde != '') {
        this.desde = this.usuario.desde;
      }
      if (this.usuario.hasta != '') {
        this.hasta = this.usuario.hasta;
      }
    }

    const usuariosSub = this.firestore.getTurnos().subscribe(listDoc => {
      listDoc.forEach((turno:TurnoComponent) => {
        if (turno.paciente.email == this.usuario.email) {
          this.listadoTurnos.push(turno);          
        }
      });

      this.listadoTurnosMostrar = this.listadoTurnos;

    });
  }

  guardarHorario() {    
    if (this.usuario.tipo == 'especialista') {
      this.usuario.desde = this.desde;
      this.usuario.hasta = this.hasta;
      this.firestore.actualizarUsuario(this.usuario).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Su perfil fue actualizado correctamente',
        })
      })
    }
  }

  verMas(turno:TurnoComponent){
    this.turno = turno;
    this.formHistoria = true;
  }

  cerrarForm($event:boolean){    
    if(!$event) {
      this.formHistoria = !this.formHistoria;
    }
  }

}
