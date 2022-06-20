import { Component, OnInit } from '@angular/core';
import { EspecialistaComponent } from 'src/app/clases/especialista/especialista.component';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { ExcelService } from 'src/app/servicios/excel.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { animate, group, query, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  animations: [
    trigger('inOut', [
      transition(':enter', [style({ height: 0 }), animate(500)]),
      transition(':leave', [animate(500, style({ height: 0 }))]),
    ])
  ],
})
export class EstadisticasComponent implements OnInit {
  graficoMostrar: string;
  tipoChart: string;
  tipoEspecialidad: string;
  tipoEspecialista: EspecialistaComponent;
  listaTipoCharts: string[];
  listaEspecialidades: any[];
  listaEspecialistasOriginal: EspecialistaComponent[];
  listaEspecialistasMostrar: EspecialistaComponent[];
  listaTurnosOriginal: TurnoComponent[];
  listaTurnosMostrar: TurnoComponent[];
  listaDatos: string[];
  cantidadDatos: any[];
  listaIngresosOriginal: any[];
  listaIngresosMostrar: any[];
  listaRangoFinal: Date[];
  fechaDeHoy: Date;
  desde: Date;
  hasta: Date;
  objetoDatos: any;
  showCardBody = false;

  constructor(private firestore: FirestoreService, private servicioExcel: ExcelService) {
    this.graficoMostrar = 'Ingresos al sistema';
    this.tipoChart = 'Ingresos al sistema';
    this.tipoEspecialidad = '';
    this.tipoEspecialista = new EspecialistaComponent();
    this.listaTipoCharts = ['Ingresos al sistema', 'Turnos p/ especialidad', 'Turnos p/ día', 'Turnos solicitados', 'Turnos finalizados'];
    this.listaEspecialidades = [];
    this.listaEspecialistasOriginal = [];
    this.listaEspecialistasMostrar = [];
    this.listaDatos = [];
    this.cantidadDatos = [];
    this.listaTurnosOriginal = [];
    this.listaTurnosMostrar = [];
    this.listaIngresosOriginal = [];
    this.listaIngresosMostrar = [];
    this.listaRangoFinal = [];
    this.fechaDeHoy = new Date();
    this.desde = new Date('06-01-2022');
    this.hasta = new Date();
  }

  ngOnInit(): void {
    this.obtenerIngresos();
    this.obtenerEspecialidades();
    this.obtenerEspecialistas();
    this.obtenerTurnos();
  }

  obtenerEspecialidades() {
    this.firestore.getEspecialidades().subscribe(listDoc => {
      this.listaEspecialidades = listDoc;
    })
  }

  obtenerEspecialistas() {
    this.firestore.getTipoUsuarios('especialista').subscribe(listDoc => {
      this.listaEspecialistasOriginal = listDoc;
      this.listaEspecialistasMostrar = this.listaEspecialistasOriginal;
    })
  }

  obtenerTurnos() {
    this.firestore.getTurnos().subscribe(listDoc => {
      this.listaTurnosOriginal = listDoc;
      this.listaTurnosMostrar = this.listaTurnosOriginal;
    })
  }

  obtenerIngresos() {
    this.firestore.getIngresosPorQuery(this.desde, this.hasta).subscribe(listDoc => {
      this.listaIngresosOriginal = listDoc;
      this.listaIngresosMostrar = this.listaIngresosOriginal;
    })
  }

  getValorDropdown($event: any, tipo: string) {
    switch (tipo) {
      case 'tipoChart':
        this.tipoChart = $event.view.getSelection().anchorNode.parentElement.innerText;
        break;

      case 'tipoEspecialidad':
        this.tipoEspecialidad = $event.view.getSelection().anchorNode.parentElement.innerText;
        break;

      case 'tipoEspecialista':
        this.tipoEspecialista = $event.view.getSelection().anchorNode.parentElement.innerText;
        break;
    }
  }

  obtenerTurnosRango() {
    var contador = 0;
    this.listaDatos = [];
    this.cantidadDatos = [];


    const subscripcion = this.firestore.getTurnosPorQuery(this.desde, this.hasta).subscribe((listDoc) => {
      listDoc.forEach(turno => {
        if (this.listaDatos.indexOf(turno.dia) == -1) this.listaDatos.push(turno.dia);
      })

      if (contador == 0) {
        const contadorLista = this.listaDatos.length;
        var contadorAux = 0;
        this.listaDatos.forEach(fecha => {
          this.firestore.getTurnosPorfecha(fecha).subscribe(turnos => {

            if (contadorAux < contadorLista) {
              this.cantidadDatos.push(turnos.length);
            }
            contadorAux++;
          });
        });
        contador = 1;

      }
    });

    setTimeout(() => {
      subscripcion.unsubscribe();
      this.graficoMostrar = 'grafPorDia';
    }, 1500);
  }

  obtenerTurnosPorEspecialidad() {
    var contador = 0;
    this.objetoDatos = [];
    this.listaDatos = [];
    this.cantidadDatos = [];

    for (let i = 0; i < this.listaEspecialidades.length; i++) {
      this.objetoDatos.push({
        especialidad: this.listaEspecialidades[i].especialidad,
        cantidad: 0
      })
    }

    const subscripcion = this.firestore.getTurnosPorQuery(this.desde, this.hasta).subscribe((listDoc) => {
      if (contador == 0) {
        listDoc.forEach((turno: TurnoComponent) => {

          this.objetoDatos.forEach((objeto: any) => {
            if (turno.especialidad == objeto.especialidad) {
              objeto.cantidad = objeto.cantidad + 1;
            }
          })
        })

        for (let i = 0; i < this.objetoDatos.length; i++) {
          this.listaDatos.push(this.objetoDatos[i].especialidad);
          this.cantidadDatos.push(this.objetoDatos[i].cantidad);
        }

        contador++;
      }
    });


    setTimeout(() => {
      subscripcion.unsubscribe();
      this.graficoMostrar = 'grafPorEspecialidad';
    }, 1500);
  }

  obtenerTurnosSolicitados() {
    var contador = 0;
    this.objetoDatos = [];
    this.listaDatos = [];
    this.cantidadDatos = [];

    for (let i = 0; i < this.listaEspecialistasOriginal.length; i++) {
      this.objetoDatos.push({
        especialista: this.listaEspecialistasOriginal[i].nombre + ' ' + this.listaEspecialistasOriginal[i].apellido,
        especialistaMail: this.listaEspecialistasOriginal[i].email,
        cantidad: 0
      })
    }

    const subscripcion = this.firestore.getTurnosPorQuery(this.desde, this.hasta).subscribe((listDoc) => {
      if (contador == 0) {
        listDoc.forEach((turno: TurnoComponent) => {

          this.objetoDatos.forEach((objeto: any) => {
            if (turno.especialista.email == objeto.especialistaMail && turno.estado != 'finalizado') {
              objeto.cantidad = objeto.cantidad + 1;
            }
          })
        })

        for (let i = 0; i < this.objetoDatos.length; i++) {
          this.listaDatos.push(this.objetoDatos[i].especialista);
          this.cantidadDatos.push(this.objetoDatos[i].cantidad);
        }

        contador++;
      }
    });


    setTimeout(() => {
      subscripcion.unsubscribe();
      this.graficoMostrar = 'grafTurnosSolicitados';
    }, 1500);
  }

  obtenerTurnosFinalizados() {
    var contador = 0;
    this.objetoDatos = [];
    this.listaDatos = [];
    this.cantidadDatos = [];

    for (let i = 0; i < this.listaEspecialistasOriginal.length; i++) {
      this.objetoDatos.push({
        especialista: this.listaEspecialistasOriginal[i].nombre + ' ' + this.listaEspecialistasOriginal[i].apellido,
        especialistaMail: this.listaEspecialistasOriginal[i].email,
        cantidad: 0
      })
    }

    const subscripcion = this.firestore.getTurnosPorQuery(this.desde, this.hasta).subscribe((listDoc) => {
      if (contador == 0) {
        listDoc.forEach((turno: TurnoComponent) => {
          console.log(turno.estado);
          this.objetoDatos.forEach((objeto: any) => {

            if (turno.especialista.email == objeto.especialistaMail && turno.estado == 'finalizado') {
              objeto.cantidad = objeto.cantidad + 1;
            }
          })
        })

        for (let i = 0; i < this.objetoDatos.length; i++) {
          this.listaDatos.push(this.objetoDatos[i].especialista);
          this.cantidadDatos.push(this.objetoDatos[i].cantidad);
        }

        contador++;
      }
    });


    setTimeout(() => {
      subscripcion.unsubscribe();
      this.graficoMostrar = 'grafTurnosFinalizados';
    }, 1500);
  }

  graficar() {
    this.showCardBody = !this.showCardBody;
    switch (this.tipoChart) {
      case 'Turnos p/ especialidad':
        this.obtenerTurnosPorEspecialidad();
        break;

      case 'Turnos p/ día':
        this.obtenerTurnosRango();
        break;

      case 'Turnos solicitados':
        this.obtenerTurnosSolicitados();
        break;

      case 'Turnos finalizados':
        this.obtenerTurnosFinalizados();
        break;

      default:
        this.obtenerIngresos();
        this.graficoMostrar = 'ingresos';
        break;
    }
  }

  descargarExcel(tipo: string) {
    var archivo: any = {};
    var array: any[] = [];

    switch (tipo) {
      case 'grafPorDia':
        for (let i = 0; i < this.listaDatos.length; i++) {
          archivo = {};
          archivo.dia = this.listaDatos[i];
          archivo.cantidad = this.cantidadDatos[i];

          console.log(archivo);
          array.push(archivo);
        }
        break;

      case 'grafPorEspecialidad':
      case 'grafTurnosSolicitados':
      case 'grafTurnosFinalizados':
        array = this.objetoDatos;
        break;
    }

    this.servicioExcel.exportAsExcelFile(array, tipo);
  }

}
