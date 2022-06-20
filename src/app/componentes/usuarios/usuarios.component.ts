import { Component, Input, OnInit } from '@angular/core';
import { PacienteComponent } from 'src/app/clases/paciente/paciente.component';
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
  listadoPacientesMostrar:PacienteComponent[];
  listadoPacientes:PacienteComponent[];
  palabraBusqueda: string;
  turno: TurnoComponent;
  paciente: PacienteComponent;
  formHistoria: boolean;

  constructor(private firestore: FirestoreService, private servicioExcel:ExcelService) {
    this.paraMostrar = false;
    this.listadoTurnos = [];
    this.listadoTurnosMostrar = [];
    this.listadoPacientesMostrar = [];
    this.listadoPacientes = [];
    this.palabraBusqueda = '';
    this.turno = new TurnoComponent();
    this.paciente = new PacienteComponent();
    this.formHistoria = false;
   }

  ngOnInit(): void {
    //version 1
    /* const usuariosSub = this.firestore.getTurnos().subscribe(listDoc => {
      this.listadoTurnos = listDoc;

      this.listadoTurnosMostrar = this.listadoTurnos;
    }); */

    const usuariosSub = this.firestore.getTipoUsuarios('paciente').subscribe(listDoc => {
      this.listadoPacientes = listDoc;

      this.listadoPacientesMostrar = this.listadoPacientes;
    })
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

  //version 1
/*   verMas(turno:TurnoComponent){
    this.turno = turno;
    this.formHistoria = true;
  } */

  verMas(paciente: PacienteComponent) {
    this.paciente = paciente;
    this.formHistoria = true;
  }

  cerrarForm($event:boolean){    
    if(!$event) {
      this.formHistoria = !this.formHistoria;
    }
  }

  //version 1
  descargarExcel(){
    var archivo = JSON.parse(JSON.stringify(this.listadoPacientesMostrar));
    
    this.servicioExcel.exportAsExcelFile(archivo, 'usuarios');
  }

  descargarExcelPaciente(paciente:PacienteComponent){
    var turnosDescargar:any = [];

    const sub = this.firestore.getTurnos().subscribe(listDoc => {
      listDoc.forEach((turno:TurnoComponent) => {
        if (turno.paciente.email == paciente.email) {
          turnosDescargar.push({
            paciente: paciente.nombre + ' ' + paciente.apellido,
            especialista: turno.especialista.nombre + ' ' + turno.especialista.apellido,
            dia: turno.dia,
            especialidad: turno.especialidad,
            estado: turno.estado,
            comentario: turno.comentario
          })
        }
      })
    });

    setTimeout(() => {
      sub.unsubscribe();
      this.servicioExcel.exportAsExcelFile(turnosDescargar, 'turnos'+ paciente.apellido);
    }, 800);
  }

}
