import { Component, Input, OnInit } from '@angular/core';
import { extendMoment } from 'moment-range';
import { Moment } from 'moment';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';

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

  /* const moment = extendMoment(moment); */

  constructor(private firestore: FirestoreService) {
    this.imagenUno = '';
    this.imagenDos = '../../../assets/perfil/bg-perfil.jpg';
    this.desde = '';
    this.hasta = '';

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

}
