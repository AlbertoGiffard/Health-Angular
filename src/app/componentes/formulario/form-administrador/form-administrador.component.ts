import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireStorageReference } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AdministradorComponent } from 'src/app/clases/administrador/administrador.component';
import { FirebaseStorageService } from 'src/app/servicios/firebase-storage.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-administrador',
  templateUrl: './form-administrador.component.html',
  styleUrls: ['./form-administrador.component.scss']
})
export class FormAdministradorComponent implements OnInit {
  mensajeError: string;
  especialidadEscogida: string;
  valorDropdown: string;
  obj: any = {};
  archivo: any;
  nombreArchivo: string;
  listadoEspecialidades : string[];
  urlImagen: string;
  urlListo: boolean;
  administrador: AdministradorComponent;
  form: FormGroup;
  fb: FormBuilder;
  userExist: any;
  token: string|undefined;
  siteKey: string;
  validadoCaptcha:boolean;

  constructor(private servicio: LoginService, private auth: Auth, private firebaseStorage: FirebaseStorageService, public router: Router, private firestore: FirestoreService) {
    this.token = undefined;
    this.validadoCaptcha = false;
    this.siteKey = environment.recaptcha.siteKey;
    this.mensajeError = "No se pudo crear el administrador de forma correcta verifique los datos.";
    this.especialidadEscogida = 'Escoger especialidad';
    this.valorDropdown = '';
    this.nombreArchivo = '';
    this.urlImagen = '';
    this.listadoEspecialidades = [];
    this.urlListo = false;
    this.userExist = this.auth.currentUser;
    this.administrador = new AdministradorComponent();
    this.fb = new FormBuilder();
    this.form = this.fb.group(
      {
        'nombre': ['', [Validators.required]],
        'apellido': ['', [Validators.required]],
        'edad': [, [Validators.required, Validators.min(18), Validators.max(200)]],
        'dni': [, [Validators.required, Validators.min(10000000), Validators.max(99000000)]],
        'especialidad': ['', [Validators.required]],
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required]],
        'imagen': [Validators.required]

      }
    );
  }

  ngOnInit(): void {
  }

  imagenSelect(input: any) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.obj.photoUrl = e.target.result;
      }
      this.nombreArchivo = input.files[0].name;
      this.archivo = input.files[0];

      //esto aca sube la foto
      this.subirArchivo().then(() => {
        this.referenciaCloud();
      });
    }
  }

  //Sube el archivo a Cloud Storage
  async subirArchivo() {
    await this.firebaseStorage.uploadCloudStorage(this.nombreArchivo, this.archivo);

  }

  async referenciaCloud() {
    var referencia: AngularFireStorageReference = await this.firebaseStorage.getCloudStorage(this.nombreArchivo);

    referencia.getDownloadURL().subscribe((url) => {
      this.urlImagen = url;
      this.urlListo = true;
    });
  }

  async cargar(administrador: AdministradorComponent) {
    if (this.urlListo) {
      try {
        await this.servicio.registrar(administrador).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Se guardo el administrador de forma correcta.',
          }
          ).then(() => {
            /* this.router.navigate(['/']).then(() => {
              window.location.reload();
            }); */
            window.location.reload();
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
        title: 'Se esta subiendo la imagen aguarde por favor',
      }
      )
    }
  }

  chequearForm = () => {
    var result = false;
    var answers = this.form.getRawValue();
    //console.log(answers);

    if (answers.nombre != '' && answers.apellido != '' && answers.edad != '' && answers.dni != '' && answers.email != '' && answers.password != '' && answers.imagen != '' && this.validadoCaptcha) {
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
  
  captcha($event:any){
    this.validadoCaptcha = true;
  }

  async subirAdministrador() {    
    if (this.chequearForm()) {
      
      this.administrador.nombre = this.form.controls['nombre'].value;
      this.administrador.apellido = this.form.controls['apellido'].value;
      this.administrador.edad = this.form.controls['edad'].value;
      this.administrador.dni = this.form.controls['dni'].value;
      this.administrador.email = this.form.controls['email'].value;
      this.administrador.password = this.form.controls['password'].value;
      this.administrador.imagen = this.urlImagen;

      this.cargar(this.administrador);


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Falta completar campos',
      })
    }
  }
}
