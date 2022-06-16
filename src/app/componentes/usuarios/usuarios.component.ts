import { Component, Input, OnInit } from '@angular/core';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { ExcelService } from 'src/app/servicios/excel.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  @Input() paraMostrar: boolean;
  listadoTurnos:TurnoComponent[];
  listadoTurnosMostrar:TurnoComponent[];
  palabraBusqueda: string;
  turno: TurnoComponent;
  formHistoria: boolean;

  constructor(private firestore: FirestoreService, private servicioExcel:ExcelService) {
    this.paraMostrar = false;
    this.listadoTurnos = [];
    this.listadoTurnosMostrar = [];
    this.palabraBusqueda = '';
    this.turno = new TurnoComponent();
    this.formHistoria = false;
   }

  ngOnInit(): void {
    const usuariosSub = this.firestore.getTurnos().subscribe(listDoc => {
      this.listadoTurnos = listDoc;

      this.listadoTurnosMostrar = this.listadoTurnos;
    });
  }

  renderizar = (mostrar: boolean) => {
    this.paraMostrar = !mostrar;
  }

  buscarPalabra() {
    if (this.palabraBusqueda == '') {
      this.listadoTurnosMostrar = this.listadoTurnos;
    } else {
      const palabra = this.palabraBusqueda.toLowerCase();
      this.listadoTurnosMostrar = this.listadoTurnos;

      this.listadoTurnosMostrar = this.listadoTurnosMostrar.filter((element, i, array) => {
        let arrayElementEspecialidad = element.especialidad.toLowerCase();
        let arrayElementPacienteNombre = element.paciente.nombre.toLowerCase();
        let arrayElementPacienteApellido = element.paciente.apellido.toLowerCase();
        return arrayElementEspecialidad.includes(palabra) || arrayElementPacienteNombre.includes(palabra) || arrayElementPacienteApellido.includes(palabra);
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

  descargarExcel(){
    var archivo = JSON.parse(JSON.stringify(this.listadoTurnosMostrar));

    archivo.forEach((turno:any) => {
      turno.paciente = turno.paciente.nombre + ' ' + turno.paciente.apellido;
      turno.especialista = turno.especialista.nombre + ' ' + turno.especialista.apellido;
      turno.hora = turno.hora + ':00hs.';
    })
    
    this.servicioExcel.exportAsExcelFile(archivo, 'usuarios');
  }

}
