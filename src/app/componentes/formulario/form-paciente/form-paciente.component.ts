import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireStorageReference } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  obj: any = {};
  archivo: any;
  nombreArchivo: string;
  urlImagen: string;
  urlListo: boolean;
  paciente: PacienteComponent;
  form: FormGroup;
  fb: FormBuilder;
  userExist: any;

  constructor(private service: LoginService, private auth: Auth, private firebaseStorage: FirebaseStorageService) {
    this.nombreArchivo = '';
    this.urlImagen = '';
    this.urlListo = false;
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
        'mail': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required]],
        'imagenUno': [Validators.required],
        'imagenDos': [Validators.required]

      }
    );
  }

  ngOnInit(): void {
  }

  //son dos archivos
  onFileSelect(input: any) {
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
    var referencia: AngularFireStorageReference = await this.firebaseStorage.getCloudStorage(this.nombreArchivo)

    referencia.getDownloadURL().subscribe((url) => {
      this.urlImagen = url;
      this.urlListo = true;
      console.log(this.urlListo,this.urlImagen);
      
    });
  }

  /* cargando = (pelicula: Pelicula) => {
    if (this.urlListo) {
      this.servicio.guardarPeliculas(pelicula).then(() => {
        window.location.reload();
      });
      alert("se guardo la pelicula!");
    } else {
      alert('se esta subiendo la pelicula aguarde por favor');
    }
  } */

  checkForm = () => {
    var result = false;
    var answers = this.form.getRawValue();
    console.log(answers);
    

    if (answers.age != '' && answers.own != '' && answers.name != '' && answers.dni != '' && answers.country != '' && answers.capacity != '') {
      result = true;
    }

    return result;
  }

  subirPaciente = () => {
    /* if (this.checkForm()) {

      this.newRepartidor.dni = this.form.controls['dni'].value;
      this.newRepartidor.name = this.form.controls['name'].value;
      this.newRepartidor.age = this.form.controls['age'].value;
      this.newRepartidor.capacity = this.form.controls['capacity'].value;
      this.newRepartidor.country = this.form.controls['country'].value;

      if (this.form.controls['own'].value == 'si') {
        this.newRepartidor.ownUnit = true;
      } else {
        this.newRepartidor.ownUnit = false;
      }

      try {
        this.servicio.guardarRepartidores(this.newRepartidor).then(() => {
          window.location.reload();
        });
        alert("se guardo el Repartidor!");
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire(
          'Falta completar campos',
          'error'
        )
    } */

  }
}
