import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecialistaComponent } from 'src/app/clases/especialista/especialista.component';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
  especialidadEscogida:string;
  listaEspecialidades: string[];
  listaEspecialistas: EspecialistaComponent[];
  listaEspecialistasMostrar: EspecialistaComponent[];
  formulario: FormGroup;
  fb: FormBuilder;

  constructor(private firestore: FirestoreService) {
    this.especialidadEscogida = 'Escoger especialidad';
    this.listaEspecialidades = [];
    this.listaEspecialistas = [];
    this.listaEspecialistasMostrar = [];
    this.fb = new FormBuilder();
    this.formulario = this.fb.group(
      {
        'imagen': [Validators.required]
      }
    );
  }

  ngOnInit(): void {
    //agrega las lista de especialistas y especialidades
    this.firestore.getEspecialistas().subscribe(listDoc => {
      this.listaEspecialistas = listDoc;
      
      this.listaEspecialistas.forEach((value: any) => {
        if (this.listaEspecialidades.indexOf(value.especialidad) == -1) this.listaEspecialidades.push(value.especialidad);
      });
    });
  }

  lista() {
    console.log(this.listaEspecialidades);
  }

  subirTurno(){

  }

  getValorDropdown($event:any) {
    console.log($event.view.getSelection().anchorNode.parentElement.innerText);
    this.especialidadEscogida = $event.view.getSelection().anchorNode.parentElement.innerText;
    
  }

}
