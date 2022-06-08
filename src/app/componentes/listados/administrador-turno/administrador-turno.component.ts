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

  constructor(private firestore: FirestoreService) {
    this.listadoTurnos = [];
    this.listadoEspecialistas = [];
    this.listadoEspecialidades = [];
   }

  ngOnInit(): void {
    const turnosSub = this.firestore.getTurnos().subscribe(listDoc => {
      this.listadoTurnos = listDoc;

      listDoc.forEach((turno:TurnoComponent) => {        
        if (this.listadoEspecialistas.indexOf(turno.especialista) == -1) this.listadoEspecialistas.push(turno.especialista);
        if (this.listadoEspecialidades.indexOf(turno.especialidad) == -1) this.listadoEspecialidades.push(turno.especialidad);
      });
    });
  }

  cancelarTurno(turno:TurnoComponent){
    this.dejarComentario();
  }

  async dejarComentario() {
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
      console.log(text);
      
    }

  }

}
