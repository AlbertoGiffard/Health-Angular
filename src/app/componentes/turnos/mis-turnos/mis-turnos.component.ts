import { Component, Input, OnInit } from '@angular/core';
import { EspecialistaComponent } from 'src/app/clases/especialista/especialista.component';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {
  @Input() especialista: any;
  botonTurno: string;
  accion: string;
  listadoTurnos: TurnoComponent[];
  listadoParaMostrar: TurnoComponent[];
  palabraBusqueda: string;

  constructor(private firestore: FirestoreService) {
    this.botonTurno = '';
    this.accion = '';
    this.palabraBusqueda = '';
    this.listadoTurnos = [];
    this.listadoParaMostrar = [];
  }

  ngOnInit(): void {
    const turnosSub = this.firestore.getTurnos().subscribe(listDoc => {
      this.listadoTurnos = listDoc;

      listDoc.forEach((turno: TurnoComponent) => {
        if (turno.especialista.email == this.especialista.email) {
          this.listadoParaMostrar.push(turno);
        }
      });
    });
  }

  buscarPalabra() {
    if (this.palabraBusqueda == '') {
      this.listadoParaMostrar = this.listadoTurnos;
    } else {
      const palabra = this.palabraBusqueda.toLowerCase();
      this.listadoParaMostrar = this.listadoTurnos;

      this.listadoParaMostrar = this.listadoParaMostrar.filter((element, i, array) => {
        let arrayElementEspecialidad = element.especialidad.toLowerCase();
        let arrayElementPacienteNombre = element.paciente.nombre.toLowerCase();
        let arrayElementPacienteApellido = element.paciente.apellido.toLowerCase();
        return arrayElementEspecialidad.includes(palabra) || arrayElementPacienteNombre.includes(palabra) || arrayElementPacienteApellido.includes(palabra);
      })

    }
  }

  async siguienteEstado(turno: TurnoComponent) {
    var mensaje: string = 'El turno fue aceptado satisfactoriamente.';

    if (turno.estado == 'pendiente') {
      turno.estado = 'aceptado';

      this.firestore.actualizarTurno(turno);
    } else {
      if (await this.completarResenia(turno)) {
        turno.estado = 'finalizado';
        this.firestore.actualizarTurno(turno).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'El turno fue finalizado satisfactoriamente.',
          });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Debe dejar un comentario.',
        });
      }
    }
  }

  async completarResenia(turno: TurnoComponent) {
    var resultado: boolean = false;

    const { value: text } = await Swal.fire({
      input: 'text',
      inputLabel: 'Dejar Reseña',
      inputPlaceholder: 'Indica un comentario al respecto del turno.',
      inputAttributes: {
        'aria-label': 'Indica un comentario al respecto del turno.'
      },
      showCancelButton: true
    })

    if (text) {
      turno.resenia = text;
      resultado = true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Debe dejar un comentario.',
      });
    }

    return resultado;
  }
  //comentario: es la calificacion del paciente
  //reseña: es el feedback del especialista

  verResenia(turno: TurnoComponent) {
    var mensaje: string = 'Aqui no hay nada... habla con el desarrollador para ver que ocurrió';

    if (turno.resenia != '') {
      mensaje = turno.resenia;
    }
    Swal.fire(mensaje);
  }

  async cancelarTurno(turno: TurnoComponent) {
    const { value: text } = await Swal.fire({
      input: 'text',
      inputLabel: 'Rechazar turno',
      inputPlaceholder: 'Indica un comentario del rechazo de este turno.',
      inputAttributes: {
        'aria-label': 'Indica un comentario del rechazo de este turno.'
      },
      showCancelButton: true
    })

    if (text) {
      turno.resenia = text;
      turno.estado = 'rechazado';
      console.log(turno);


      /* this.firestore.actualizarTurno(turno).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Turno rechazado correctamente.',
        });
      }); */
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Debe indicar un comentario para poder cancelarlo.',
      });
    }
  }

}
