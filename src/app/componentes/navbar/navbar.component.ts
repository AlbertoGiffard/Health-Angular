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
            uid = user.id;
            this.firestore.getUsuario(user.id).subscribe(user => {
              const userWithId = { id: uid, ...user.data() }
              //aca debe ir el cambio de estado y validar que tipo de usuario es
              if (user.data().estado == 'pendiente') {
                this.firestore.BuscarTipoUsuario(userWithId).then(() => {
                  this.validado = true;
                  this.usuario = userWithId;

                });
              } else {
                this.validado = true;
                this.usuario = userWithId;
              }
            })
          }
        });
      });
    } else {
      if (this.user$) {
        this.user$.subscribe(userAuth => {
          this.firestore.getUsuarios().subscribe(listDoc => {
            listDoc.forEach(user => {
              if (user.email == userAuth.email) {
                uid = user.id;
                this.firestore.getUsuario(user.id).subscribe(user => {
                  const userWithId = { id: uid, ...user.data() }
                  //aca debe ir el cambio de estado y validar que tipo de usuario es
                  if (user.data().estado != 'pendiente') {
                    this.validado = true;
                    this.usuario = userWithId;
                  }
                })
              }
            });
          });
        })
      }
    }
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log("Hubo un error al desloguearse");
    }
  }

}
