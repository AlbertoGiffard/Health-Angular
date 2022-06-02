import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireStorageReference } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { PacienteComponent } from 'src/app/clases/paciente/paciente.component';
import { FirebaseStorageService } from 'src/app/servicios/firebase-storage.service';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.scss']
})
export class FormPacienteComponent implements OnInit {
  mensajeError: string;
  objUno: any = {};
  archivoUno: any;
  nombreArchivoUno: string;
  objDos: any = {};
  archivoDos: any;
  nombreArchivoDos: string;
  urlImagenUno: string;
  urlImagenDos: string;
  urlListoUno: boolean;
  urlListoDos: boolean;
  paciente: PacienteComponent;
  form: FormGroup;
  fb: FormBuilder;
  userExist: any;

  constructor(private servicio: LoginService, private auth: Auth, private firebaseStorage: FirebaseStorageService, public router: Router) {
    this.mensajeError = "No se pudo crear el paciente de forma correcta verifique los datos.";
    this.nombreArchivoUno = '';
    this.nombreArchivoDos = '';
    this.urlImagenUno = '';
    this.urlImagenDos = '';
    this.urlListoUno = false;
    this.urlListoDos = false;
    this.userExist = this.auth.currentUser;
    this.paciente = new PacienteComponent();
    this.fb = new FormBuilder();
    this.form = this.fb.group(
      {
        'nombre': ['', [Validators.required]],
        'apellido': ['', [Validators.required]],
        'edad': [, [Validators.required, Validators.min(18), Validators.max(200)]],
        'dni': [, [Validators.required, Validators.min(10000000), Validators.max(99000000)]],
        'obraSocial': ['', [Validators.required]],
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required]],
        'imagenUno': [Validators.required],
        'imagenDos': [Validators.required]

      }
    );
  }

  ngOnInit(): void {
  }

  //son dos archivos
  imagenUnoSelect(input: any) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.objUno.photoUrl = e.target.result;
      }
      this.nombreArchivoUno = input.files[0].name;
      this.archivoUno = input.files[0];

      //esto aca sube la foto
      this.subirArchivo(true).then(() => {
        this.referenciaCloudUno();
      });
    }
  }

  //son dos archivos
  imagenDosSelect(input: any) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.objDos.photoUrl = e.target.result;
      }
      this.nombreArchivoDos = input.files[0].name;
      this.archivoDos = input.files[0];

      //esto aca sube la foto
      this.subirArchivo(false).then(() => {
        this.referenciaCloudDos();
      });
    }
  }

  //Sube el archivo a Cloud Storage
  async subirArchivo(one: boolean) {
    if (one) {
      await this.firebaseStorage.uploadCloudStorage(this.nombreArchivoUno, this.archivoUno);
    } else {
      await this.firebaseStorage.uploadCloudStorage(this.nombreArchivoDos, this.archivoDos);
    }

  }

  async referenciaCloudUno() {
    var referenciaUno: AngularFireStorageReference = await this.firebaseStorage.getCloudStorage(this.nombreArchivoUno);

    referenciaUno.getDownloadURL().subscribe((url) => {
      this.urlImagenUno = url;
      this.urlListoUno = true;
    });
  }

  async referenciaCloudDos() {
    var referenciaDos: AngularFireStorageReference = await this.firebaseStorage.getCloudStorage(this.nombreArchivoDos);

    referenciaDos.getDownloadURL().subscribe((url) => {
      this.urlImagenDos = url;
      this.urlListoDos = true;
    });
  }

  async cargar(paciente: PacienteComponent) {
    if (this.urlListoUno && this.urlListoDos) {
      try {
        await this.servicio.registrarConMail(paciente).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Se guardo el paciente de forma correcta, te llegara un email para verificar el usuario creado.',
          }
          ).then(() => {
            this.router.navigate(['/']);
          })
        });

      } catch (error) {
        if (error instanceof FirebaseError) {
          console.log(error.code);
          Swal.fire({
            icon: 'error',
            title: this.convertidorDeMensaje(error.code),
          }
          )
        }
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Se estan subiendo las imagenes aguarde por favor',
      }
      )
    }
  }

  chequearForm = () => {
    var result = false;
    var answers = this.form.getRawValue();
    //console.log(answers);


    if (answers.nombre != '' && answers.apellido != '' && answers.edad != '' && answers.dni != '' && answers.obraSocial != '' && answers.email != '' && answers.password != '' && answers.imagenUno != '' && answers.imagenDos != '') {
      result = true;
    }

    return result;
  }

  convertidorDeMensaje(code: string): string {
    switch (code) {
      case 'auth/user-disabled': {
        return 'Usuario deshabilitado.';
      }
      case 'auth/user-not-found': {
        return 'Usuario no encontrado.';
      }
      case 'auth/wrong-password': {
        return 'Password incorrecto intente nuevamente.';
      }
      case 'auth/email-already-in-use': {
        return 'Usuario ya creado.';
      }
      case 'auth/weak-password': {
        return 'Error, password debil, minimo 6 digitos.';
      }
      case 'auth/invalid-email': {
        return 'Error, email Invalido.';
      }
      default: {
        return 'No se pudo crear el usuario de forma correcta verifique los datos.';
      }
    }
  }

  async subirPaciente() {    
    if (this.chequearForm()) {
      
      this.paciente.nombre = this.form.controls['nombre'].value;
      this.paciente.apellido = this.form.controls['apellido'].value;
      this.paciente.edad = this.form.controls['edad'].value;
      this.paciente.dni = this.form.controls['dni'].value;
      this.paciente.obraSocial = this.form.controls['obraSocial'].value;
      this.paciente.email = this.form.controls['email'].value;
      this.paciente.password = this.form.controls['password'].value;
      this.paciente.imagenUno = this.urlImagenUno;
      this.paciente.ImagenDos = this.urlImagenDos;

      this.cargar(this.paciente);


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Falta completar campos',
      })
    }

  }
}
