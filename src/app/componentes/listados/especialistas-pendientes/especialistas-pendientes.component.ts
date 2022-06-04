import { Component, OnInit } from '@angular/core';
import { EspecialistaComponent } from 'src/app/clases/especialista/especialista.component';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-especialistas-pendientes',
  templateUrl: './especialistas-pendientes.component.html',
  styleUrls: ['./especialistas-pendientes.component.scss']
})
export class EspecialistasPendientesComponent implements OnInit {
  listadoEspecialistas:EspecialistaComponent[];

  constructor(private firestore: FirestoreService) { 
    this.listadoEspecialistas = [];
  }

  ngOnInit(): void {
    const usuariosSub = this.firestore.getUsuarios().subscribe(listDoc => {
      listDoc.forEach((usuario:any) => {
        if (usuario.tipo == 'especialista' && usuario.estado == 'pendiente') {
          usuario.id = usuario.uid;
          
          this.listadoEspecialistas.push(usuario);
          console.log('entre');
          
        }
      });
    });
  }

  async validarEspecialista(especialista:any) {
    especialista.estado = 'validado';    
    await this.firestore.actualizarUsuario(especialista).then(() => window.location.reload());
  }

}
