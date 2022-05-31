import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { LoginService } from 'src/app/servicios/login.service';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public created: boolean = false;
  public errorMessage: string;
  public tipo: string;
  public paciente: boolean;

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: LoginService, private router: Router, private auth: Auth) {
    this.errorMessage = "No se pudo crear el usuario de forma correcta verifique los datos.";
    this.tipo = 'Paciente';
    this.paciente = true;
  }

  ngOnInit(): void {
  }

  async onRegister() {
    const { name, email, password } = this.registerForm.value;

    try {
      //const user = await this.authService.register(name, email, password);          

      /* if (user) {
        //redirect to home
        this.created = false;
        this.router.navigate(['/']);
      } */

    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        this.errorMessage = this.convertMessage(error.code);
        this.created = true;
      }
    }
  }

  convertMessage(code: string): string {
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

  MostrarForm(paciente: boolean) {
    if (paciente) {
      this.tipo = 'Paciente';
      this.paciente = true;
    } else {
      this.tipo = 'Especialista';
      this.paciente = false;      
    }
  }
}
