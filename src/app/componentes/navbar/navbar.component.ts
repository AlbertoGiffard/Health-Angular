import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(private authService: LoginService, private router: Router, private auth: Auth, private firestore: FirestoreService) {

  }

  ngOnInit(): void {
    try {
      this.firestore.validarUsuario();      
    } catch (error) {   
      console.log('no se encontro nada...');
         
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
