import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() paraMostrar: boolean;
  //public user$: Observable<any> = this.authService.afAuth.user;

  constructor(private authService: LoginService, private router: Router) {
    this.paraMostrar = false;
  }

  ngOnInit(): void {

  }

  renderizar = (mostrar: boolean) => {
    this.paraMostrar = !mostrar;
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
