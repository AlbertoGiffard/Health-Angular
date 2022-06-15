import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteComponent } from 'src/app/clases/paciente/paciente.component';
import { TurnoComponent } from 'src/app/clases/turno/turno.component';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-historia-clinica',
  templateUrl: './form-historia-clinica.component.html',
  styleUrls: ['./form-historia-clinica.component.scss'],
  animations: [
    trigger('childAnimation', [
      // ...
      state('open', style({
        height: '450px',
        opacity: 1,
        backgroundColor: 'rgb(167,194,233)'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        backgroundColor: '#a8b3b3'
      })),
      transition('* => *', [
        animate('1.5s')
      ]),
    ]),
  ],
})
export class FormHistoriaClinicaComponent implements OnInit {
  @Input() lanzarAnimacion: boolean;
  @Input() turno: TurnoComponent;
  @Output() cerrarForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  isOpen: boolean;
  inputDinamicoUno: string;
  inputDinamicoDos: string;
  inputDinamicoTres: string;
  form: FormGroup;
  fb: FormBuilder;

  constructor(private firestore: FirestoreService, private router: Router) {
    this.lanzarAnimacion = true;
    this.turno = new TurnoComponent();
    this.isOpen = true;
    this.inputDinamicoUno = '';
    this.inputDinamicoDos = '';
    this.inputDinamicoTres = '';
    this.fb = new FormBuilder();
    this.form = this.fb.group(
      {
        'altura': [, [Validators.required, Validators.min(100), Validators.max(300)]],
        'peso': [, [Validators.required, Validators.min(1), Validators.max(400)]],
        'temperatura': [, [Validators.required, Validators.min(34), Validators.max(43)]],
        'presion': [, [Validators.required, Validators.min(120), Validators.max(200)]],
        'inputDinamicoUno': ['', Validators.required],
        'inputDinamicoDos': ['', Validators.required],
        'inputDinamicoTres': ['', Validators.required],
        'campoDinamicoUno': ['', Validators.required],
        'campoDinamicoDos': ['', Validators.required],
        'campoDinamicoTres': ['', Validators.required]
      }
    );

  }

  ngOnInit(): void {
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.lanzarAnimacion = !this.lanzarAnimacion;
    this.cerrarForm.emit(this.isOpen);
  }

  chequearForm = () => {
    var resultado = false;
    var formulario = this.form.getRawValue();


    if (formulario.altura != '' && formulario.peso != '' && formulario.temperatura != '' && formulario.presion != '' && formulario.campoDinamicoUno != '' && formulario.campoDinamicoDos != '' && formulario.campoDinamicoTres != '') {
      resultado = true;
    }

    return resultado;
  }

  async actualizarPaciente() {
    if (this.chequearForm()) {

      this.turno.paciente.altura = this.form.controls['altura'].value;
      this.turno.paciente.peso = this.form.controls['peso'].value;
      this.turno.paciente.temperatura = this.form.controls['temperatura'].value;
      this.turno.paciente.presion = this.form.controls['presion'].value;
      this.turno.paciente.campoDinamicoUno = { clave: this.form.controls['inputDinamicoUno'].value, valor: this.form.controls['campoDinamicoUno'].value };
      this.turno.paciente.campoDinamicoDos = { clave: this.form.controls['inputDinamicoDos'].value, valor: this.form.controls['campoDinamicoDos'].value };
      this.turno.paciente.campoDinamicoTres = { clave: this.form.controls['inputDinamicoTres'].value, valor: this.form.controls['campoDinamicoTres'].value };

      //si completa la reseña
      if (await this.completarResenia(this.turno)) {
        //cambia el estado a finalizado
        this.turno.estado = 'finalizado';
        //primero actualiza el paciente en fb

        await this.firestore.actualizarUsuario(this.turno.paciente).then(() => {
          //luego actualiza el turno en fb y muestra el modal si todo esta ok, cierra la ventana
          this.firestore.actualizarTurno(this.turno).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Se actualizaron los datos del paciente y el comentario correctamente.',
            }).then(() => {
              this.isOpen = false;
              this.lanzarAnimacion = false;
              this.cerrarForm.emit(this.isOpen);
              this.router.navigate(['/home']);
            });
          })
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Debe dejar un comentario.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Falta completar campos.',
      })
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
      turno.comentario = text;
      resultado = true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Debe dejar un comentario.',
      });
    }

    return resultado;
  }


}
