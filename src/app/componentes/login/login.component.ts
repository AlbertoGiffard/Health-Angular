import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { LoginService } from 'src/app/servicios/login.service';
import { FirebaseError } from 'firebase/app';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';
import { resolve } from 'dns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  enfocado: string;
  created: boolean;
  errorMessage: string;
  loginForm: FormGroup;

  constructor(private authServicio: LoginService, private router: Router, private auth: Auth, private firestore: FirestoreService) {
    this.enfocado = '';
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });

    this.errorMessage = "No se pudo loguear al usuario de forma correcta verifique los datos.";
    this.created = false;
  }

  ngOnInit(): void {
  }

  async onLogin() {
    await this.buscarUsuario();
  }

  async buscarUsuario() {
    const { email, password } = this.loginForm.value;
    var encontrado: number = -1;
    var mensajeEncontrado: string = '';
    var usuarioEncontrado: string;

    const clienteSubscripcion = this.firestore.getUsuarios().subscribe(listDoc => {
      for (let i = 0; i < listDoc.length; i++) {
        const usuario = listDoc[i];

        if (usuario.email == email) {
          if (usuario.estado != 'pendiente') {
            encontrado = 1;
            usuarioEncontrado = usuario;
            break;
          } else {
            encontrado = 0;
            //mensaje
            mensajeEncontrado = this.validarTipoUsuario(usuario.tipo);
            break;
          }
        }
      }

      if (encontrado == -1) {
        Swal.fire({
          icon: 'error',
          title: 'No se encontró al usuario',
        })

      } else if (encontrado == 0) {
        Swal.fire({
          icon: 'error',
          title: mensajeEncontrado,
        })
      } else {
        this.autenticarUsuario(usuarioEncontrado);
      }
      clienteSubscripcion.unsubscribe();
    })

  }

  async autenticarUsuario(usuarioEncontrado: any) {
    const { email, password } = this.loginForm.value;

    try {
      const user = await this.authServicio.login(email, password);

      if (user) {
        //redirect to home        
        this.authServicio.guardarUsuarioActual(usuarioEncontrado);
        
        console.log('welcome home');
        this.router.navigate(['/home']);

      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        Swal.fire({
          icon: 'error',
          title: this.convertidorMensaje(error.code),
        })
        //esto es para mostrar la pantalla en rojo
        //this.errorMessage = this.convertidorMensaje(error.code);
        //this.created = true;
      }
    }
  }

  validarTipoUsuario(tipoUsuario: string): string {
    var result: string = 'Cuenta sin verificar';

    switch (tipoUsuario) {
      case 'especialista':
        result = 'El administrador no ha validado tu cuenta';
        break;

      case 'paciente':
        result = 'Necesitas verificar el mail para ingresar';
        break;
    }

    return result;
  }

  administrador() {
    this.loginForm.setValue({
      email: 'vision@gmail.com',
      password: '123456'
    })
  }

  especialistaUno() {
    this.loginForm.setValue({
      email: 'especialistauno@gmail.com',
      password: '123456'
    })
  }

  especialistaDos() {
    this.loginForm.setValue({
      email: 'especialistados@gmail.com',
      password: '123456'
    })
  }

  pacienteUno() {
    this.loginForm.setValue({
      email: 'pacienteuno@gmail.com',
      password: '123456'
    })
  }

  pacienteDos() {
    this.loginForm.setValue({
      email: 'pacientedos@gmail.com',
      password: '123456'
    })
  }

  pacienteTres() {
    this.loginForm.setValue({
      email: 'pacientetres@gmail.com',
      password: '123456'
    })
  }

  convertidorMensaje(code: string): string {
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
        return 'Error, mail Invalido.';
      }
      default: {
        return 'No se pudo crear el usuario de forma correcta verifique los datos.';
      }
    }
  }
}
