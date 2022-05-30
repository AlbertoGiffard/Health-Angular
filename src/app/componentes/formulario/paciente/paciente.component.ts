import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';
import { Auth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { FirebaseStorageService } from 'src/app/servicios/firebase-storage.service';
import { AngularFireStorageReference } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {
  obj: any = {};
  archivo: any;
  nombreArchivo: string;
  urlImagen: string;
  urlListo: boolean;
  form: FormGroup;
  fb: FormBuilder;
  userExist: any;

  constructor(private service: LoginService, private auth: Auth, private firebaseStorage: FirebaseStorageService) {
    this.nombreArchivo = '';
    this.urlImagen = '';
    this.urlListo = false;
    this.userExist = this.auth.currentUser;
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
}
