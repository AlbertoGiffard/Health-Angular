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
  turno: TurnoComponent;
  botonTurno: string;
  accion: string;
  listadoTurnos: TurnoComponent[];
  listadoParaMostrar: TurnoComponent[];
  palabraBusqueda: string;
  formHistoria: boolean;

  constructor(private firestore: FirestoreService) {
    this.turno = new TurnoComponent();
    this.formHistoria = false;
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
        let arrayElementComentario = element.comentario.toLowerCase();
        let arrayElementResenia = element.resenia.toLowerCase();
        let arrayElementDia = element.dia.toLowerCase();
        let arrayElementEstado = element.estado.toLowerCase();
        let arrayElementHora = element.hora.toLowerCase();
        let arrayElementCampoDinamicoUnoClave = '}}}';
        let arrayElementCampoDinamicoUnoValor = '}}}';
        let arrayElementCampoDinamicoDosClave = '}}}';
        let arrayElementCampoDinamicoDosValor = '}}}';
        let arrayElementCampoDinamicoTresClave = '}}}';
        let arrayElementCampoDinamicoTresValor = '}}}';
        let arrayElementAltura = '}}}';
        let arrayElementPeso = '}}}';
        let arrayElementPresion = '}}}';
        let arrayElementTemperatura = '}}}';

        if (element.paciente.campoDinamicoUno) {
          arrayElementCampoDinamicoUnoClave = element.paciente.campoDinamicoUno.clave.toLowerCase();
          arrayElementCampoDinamicoUnoValor = element.paciente.campoDinamicoUno.valor.toLowerCase();
        }
        if (element.paciente.campoDinamicoDos) {
          arrayElementCampoDinamicoDosClave = element.paciente.campoDinamicoDos.clave.toLowerCase();
          arrayElementCampoDinamicoDosValor = element.paciente.campoDinamicoDos.valor.toLowerCase();
        }
        if (element.paciente.campoDinamicoTres) {
          arrayElementCampoDinamicoTresClave = element.paciente.campoDinamicoTres.clave.toLowerCase();
          arrayElementCampoDinamicoTresValor = element.paciente.campoDinamicoTres.valor.toLowerCase();
        }
        if (element.paciente.altura) {
          arrayElementAltura = element.paciente.altura.toString();
        }
        if (element.paciente.peso) {
          arrayElementPeso = element.paciente.peso.toString();
        }
        if (element.paciente.presion) {
          arrayElementPresion = element.paciente.presion.toString();
        }
        if (element.paciente.temperatura) {
          arrayElementTemperatura = element.paciente.temperatura.toString();
        }
        return arrayElementEspecialidad.includes(palabra) || arrayElementPacienteNombre.includes(palabra) || arrayElementPacienteApellido.includes(palabra) || arrayElementComentario.includes(palabra) || arrayElementResenia.includes(palabra) || arrayElementDia.includes(palabra) || arrayElementEstado.includes(palabra) || arrayElementHora.includes(palabra) || arrayElementCampoDinamicoUnoClave.includes(palabra) || arrayElementCampoDinamicoUnoValor.includes(palabra) || arrayElementCampoDinamicoDosClave.includes(palabra) || arrayElementCampoDinamicoDosValor.includes(palabra) || arrayElementCampoDinamicoTresClave.includes(palabra) || arrayElementCampoDinamicoTresValor.includes(palabra) || arrayElementAltura.includes(palabra) || arrayElementPeso.includes(palabra) || arrayElementPresion.includes(palabra) || arrayElementTemperatura.includes(palabra);
      })

    }
  }

  async siguienteEstado(turno: TurnoComponent) {
    if (turno.estado == 'pendiente') {
      turno.estado = 'aceptado';

      //aun no actualizamos con Firebase
      //this.firestore.actualizarTurno(turno);
    } else {
      this.turno = turno;
      this.formHistoria = true;
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
    var mensaje: string = 'Aqui no hay nada... comunicate con soporte para ver que ocurrió';

    if (turno.resenia != '') {
      mensaje = turno.resenia;
    }
    Swal.fire(mensaje);
  }

  verComentario(turno: TurnoComponent) {
    var mensaje: string = 'Aqui no hay nada... comunicate con soporte para ver que ocurrió';

    if (turno.comentario != '') {
      mensaje = turno.comentario;
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

  cerrarForm($event: boolean) {
    if (!$event) {
      this.formHistoria = !this.formHistoria;
    }
  }

}
