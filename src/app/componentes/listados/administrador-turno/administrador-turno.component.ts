import { Component, OnInit } from '@angular/core';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { EspecialistaComponent } from 'src/app/clases/especialista/especialista.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador-turno',
  templateUrl: './administrador-turno.component.html',
  styleUrls: ['./administrador-turno.component.scss']
})
export class AdministradorTurnoComponent implements OnInit {
  listadoTurnos: TurnoComponent[];
  listadoEspecialistas: EspecialistaComponent[];
  listadoEspecialidades: string[];
  listadoParaMostrar: TurnoComponent[];
  palabraBusqueda: string;

  constructor(private firestore: FirestoreService) {
    this.palabraBusqueda = '';
    this.listadoTurnos = [];
    this.listadoEspecialistas = [];
    this.listadoEspecialidades = [];
    this.listadoParaMostrar = [];
   }

  ngOnInit(): void {
    const turnosSub = this.firestore.getTurnos().subscribe(listDoc => {
      this.listadoTurnos = listDoc;
      this.listadoParaMostrar = this.listadoTurnos;
      

      listDoc.forEach((turno:TurnoComponent) => {        
        if (this.listadoEspecialistas.indexOf(turno.especialista) == -1) this.listadoEspecialistas.push(turno.especialista);
        if (this.listadoEspecialidades.indexOf(turno.especialidad) == -1) this.listadoEspecialidades.push(turno.especialidad);
      });
    });
  }

  buscarPalabra() {
    if (this.palabraBusqueda == '') {
      this.listadoParaMostrar = this.listadoTurnos;
    } else {
      const palabra = this.palabraBusqueda.toLowerCase();

      this.listadoParaMostrar = this.listadoParaMostrar.filter((element, i, array) => {
        let arrayElementEspecialidad = element.especialidad.toLowerCase();
        let arrayElementEspecialistaNombre = element.especialista.nombre.toLowerCase();
        let arrayElementEspecialistaApellido = element.especialista.apellido.toLowerCase();
        return arrayElementEspecialidad.includes(palabra) || arrayElementEspecialistaNombre.includes(palabra) || arrayElementEspecialistaApellido.includes(palabra);
      })
    }
  }

  async cancelarTurno(turno:TurnoComponent){
    const { value: text } = await Swal.fire({
      input: 'text',
      inputLabel: 'Rechazar turno',
      inputPlaceholder: 'Indica un comentario del rechazo de este turno',
      inputAttributes: {
        'aria-label': 'Indica un comentario del rechazo de este turno'
      },
      showCancelButton: true
    })
    
    if (text) {
      turno.comentario = text;
      turno.estado = 'rechazado';
      
      this.firestore.actualizarTurno(turno);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Debe indicar un comentario para poder cancelarlo.',
      });
    }
  }

}
