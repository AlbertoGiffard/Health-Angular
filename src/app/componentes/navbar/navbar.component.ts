import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<any> = this.authService.afAuth.user;
  validado: boolean;
  usuario: any;


  constructor(private authService: LoginService, private router: Router, private auth: Auth, private firestore: FirestoreService) {
    this.validado = false;
  }

  ngOnInit(): void {
    try {
      this.existeUsuario();
    } catch (error) {
      console.log('no se encontro nada...');
    }
  }

  existeUsuario() {
    var uid: string = '';

    if (isSignInWithEmailLink(this.auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Por favor indicanos tu email para validar');
      }
      this.firestore.getUsuarios().subscribe(listDoc => {
        listDoc.forEach(user => {
          if (user.email == email) {
            //aca debe ir el cambio de estado y validar que tipo de usuario es
            if (user.estado == 'pendiente') {
              user.id = user.uid;
              
              this.firestore.BuscarTipoUsuario(user).then(() => {
                this.validado = true;
                this.usuario = user;
                this.authService.guardarUsuarioActual(this.usuario);

              });
            } else {
              this.validado = true;
              this.usuario = user;
            }
          }
        });
      });
    } else {
      if (this.user$) {
        this.user$.subscribe(userAuth => {
          if (userAuth) {            
            this.firestore.getUsuarios().subscribe(listDoc => {
              listDoc.forEach(doc => {
                
                if (doc.email == userAuth.email) {
                  uid = userAuth.uid;
                  doc.id = userAuth.uid;
  
                  //aca debe ir el cambio de estado y validar que tipo de usuario es
                  if (doc.estado != 'pendiente') {
                    this.validado = true;
                    this.usuario = doc;
                    this.authService.guardarUsuarioActual(this.usuario);
                  }                                   
                }
              });
            });
          }
        })
      }
    }
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log("Hubo un error al desloguearse");
    }
  }

}
