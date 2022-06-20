import { Component, Input, OnInit } from '@angular/core';
import { extendMoment } from 'moment-range';
import { Moment } from 'moment';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @Input() usuario: any;
  imagenUno: string;
  imagenDos: string;
  desde: string;
  hasta: string;
  listadoTurnos: TurnoComponent[];
  listadoTurnosMostrar: TurnoComponent[];
  palabraBusqueda: string;
  turno: TurnoComponent;
  formHistoria: boolean;
  documentoPDF = new jsPDF();

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
      listDoc.forEach((turno: TurnoComponent) => {
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

  verMas(turno: TurnoComponent) {
    this.turno = turno;
    this.formHistoria = true;
  }

  cerrarForm($event: boolean) {
    if (!$event) {
      this.formHistoria = !this.formHistoria;
    }
  }

  descargarPdf() {
    const fecha = new Date();
    const fechaPdf = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
    var distancia = 85;

    this.documentoPDF.addImage("https://cdn-icons-png.flaticon.com/512/2966/2966327.png", "JPEG", 150, 10, 50, 50);
    this.documentoPDF.text("Tu Perfil: " + this.usuario.nombre + ' ' + this.usuario.apellido, 35, 25);
    this.documentoPDF.text("Fecha de emision: " + fechaPdf, 35, 35);
    this.documentoPDF.text("DNI: " + this.usuario.dni, 35, 45);
    this.documentoPDF.text("Edad: " + this.usuario.edad, 35, 55);
    this.documentoPDF.text("Email: " + this.usuario.email, 35, 65);
    this.documentoPDF.text("Obra Social: " + this.usuario.email, 35, 75);
    if (this.usuario.peso != undefined) {
      this.documentoPDF.text("Peso: " + this.usuario.peso + ' kg.', 35, distancia);
      distancia += 10;
    }
    if (this.usuario.presion != undefined) {
      this.documentoPDF.text("Presión: " + this.usuario.presion + ' kg.', 35, distancia);
      distancia += 10;
    }
    if (this.usuario.temperatura != undefined) {
      this.documentoPDF.text("Temperatura: " + this.usuario.temperatura + ' °C', 35, distancia);
      distancia += 10;
    }
    if (this.usuario.altura != undefined) {
      this.documentoPDF.text("Altura: " + this.usuario.altura + ' cm.', 35, distancia);
      distancia += 10;
    }
    if (this.usuario.campoDinamicoUno != undefined) {
      this.documentoPDF.text(this.usuario.campoDinamicoUno.clave + ": " + this.usuario.campoDinamicoUno.valor, 35, distancia);
      distancia += 10;
    }
    if (this.usuario.campoDinamicoDos != undefined) {
      this.documentoPDF.text(this.usuario.campoDinamicoDos.clave + ": " + this.usuario.campoDinamicoDos.valor, 35, distancia);
      distancia += 10;
    }
    if (this.usuario.campoDinamicoTres != undefined) {
      this.documentoPDF.text(this.usuario.campoDinamicoTres.clave + ": " + this.usuario.campoDinamicoTres.valor, 35, distancia);
    }

    this.documentoPDF.save(this.usuario.apellido + ".pdf");
  }

}
