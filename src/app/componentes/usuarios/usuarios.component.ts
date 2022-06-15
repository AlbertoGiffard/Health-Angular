import { Component, Input, OnInit } from '@angular/core';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  listadoTurnos:TurnoComponent[];
  listadoTurnosMostrar:TurnoComponent[];
  palabraBusqueda: string;
  turno: TurnoComponent;
  formHistoria: boolean;

  constructor(private firestore: FirestoreService) {
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

}
