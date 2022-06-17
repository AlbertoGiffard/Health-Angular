import { Component, OnInit } from '@angular/core';
import { EspecialistaComponent } from 'src/app/clases/especialista/especialista.component';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
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
  listaIngresosOriginal: any[];
  listaIngresosMostrar: any[];
  listaRangoFinal: Date[];
  fechaDeHoy: Date;
  desde: Date;
  hasta: Date;

  constructor(private firestore: FirestoreService) {
    this.graficoMostrar = 'Ingresos al sistema';
    this.tipoChart = 'Ingresos al sistema';
    this.tipoEspecialidad = '';
    this.tipoEspecialista = new EspecialistaComponent();
    this.listaTipoCharts = ['Ingresos al sistema', 'Turnos p/ especialidad', 'Turnos p/ día', 'Turnos solicitados', 'Turnos finalizados'];
    this.listaEspecialidades = [];
    this.listaEspecialistasOriginal = [];
    this.listaEspecialistasMostrar = [];
    this.listaTurnosOriginal = [];
    this.listaTurnosMostrar = [];
    this.listaIngresosOriginal = [];
    this.listaIngresosMostrar = [];
    this.listaRangoFinal = [];
    this.fechaDeHoy = new Date();
    this.desde = new Date('01-06-2022');
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
      /*  listDoc.forEach((turno:TurnoComponent) => {        
         if (this.listadoEspecialistas.indexOf(turno.especialista) == -1) this.listadoEspecialistas.push(turno.especialista);
         if (this.listadoEspecialidades.indexOf(turno.especialidad) == -1) this.listadoEspecialidades.push(turno.especialidad);
       }); */
    })
  }

  obtenerIngresos(){
    this.firestore.getIngresos().subscribe(listDoc => {
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

  graficar(){
    console.log(this.desde);
    console.log(this.hasta);
  }

}
