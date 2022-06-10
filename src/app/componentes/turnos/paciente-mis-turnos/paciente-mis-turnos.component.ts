import { Component, Input, OnInit } from '@angular/core';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-mis-turnos',
  templateUrl: './paciente-mis-turnos.component.html',
  styleUrls: ['./paciente-mis-turnos.component.scss']
})
export class PacienteMisTurnosComponent implements OnInit {
  @Input() paciente: any;
  listadoTurnos: TurnoComponent[];
  listadoParaMostrar: TurnoComponent[];
  palabraBusqueda: string;

  constructor(private firestore: FirestoreService) {
    this.palabraBusqueda = '';
    this.listadoTurnos = [];
    this.listadoParaMostrar = [];
  }

  ngOnInit(): void {
    const turnosSub = this.firestore.getTurnos().subscribe(listDoc => {
      this.listadoTurnos = listDoc;

      listDoc.forEach((turno: TurnoComponent) => {
        if (turno.paciente.email == this.paciente.email) {
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
        let arrayElementEspecialistaNombre = element.especialista.nombre.toLowerCase();
        let arrayElementEspecialistaApellido = element.especialista.apellido.toLowerCase();
        return arrayElementEspecialidad.includes(palabra) || arrayElementEspecialistaNombre.includes(palabra) || arrayElementEspecialistaApellido.includes(palabra);
      })

    }
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
      this.firestore.actualizarTurno(turno).then(() => {
        console.log(turno);
        Swal.fire({
          icon: 'success',
          title: 'Turno cancelado satisfactoriamente.',
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Debe indicar un comentario para poder cancelarlo.',
      });
    }
  }

  async guardarComentario(turno: TurnoComponent) {

    if (await this.completarComentario(turno)) {
      /* this.firestore.actualizarTurno(turno).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Se guardo el comentario guardado satisfactoriamente.',
        });
      }); */
      console.log(turno);

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Debe dejar un comentario.',
      });
    }
  }

  async completarComentario(turno: TurnoComponent) {
    var resultado: boolean = false;

    const { value: text } = await Swal.fire({
      input: 'text',
      inputLabel: 'Dejar Comentario',
      inputPlaceholder: 'Indica un comentario/reseña además de la calificación que le da al especialista que lo/a vió.',
      inputAttributes: {
        'aria-label': 'Indica un comentario/reseña además de la calificación que le da al especialista que lo/a vió.'
      },
      showCancelButton: true
    })

    if (text) {
      turno.comentario = text;
      resultado = true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Debe dejar un comentario.',
      });
    }

    return resultado;
  }

  verResenia(turno: TurnoComponent) {
    var mensaje: string = 'Aqui no hay nada... habla con el desarrollador para ver que ocurrió';

    if (turno.resenia != '') {
      mensaje = turno.resenia;
    }
    Swal.fire(mensaje);
  }

  verComentario(turno: TurnoComponent) {
    var mensaje: string = 'Aqui no hay nada... habla con el desarrollador para ver que ocurrió';

    if (turno.comentario != '') {
      mensaje = turno.comentario;
    }
    Swal.fire(mensaje);
  }

}
