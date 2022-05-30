import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/bienvenida',
    pathMatch: 'full'
  },
  { path: 'bienvenida', loadChildren: () => import('./componentes/bienvenida/bienvenida.module').then(m => m.BienvenidaModule) },
  { path: 'login', loadChildren: () => import('./componentes/login/login.module').then(m => m.LoginModule) },
  { path: 'registro', loadChildren: () => import('./componentes/registro/registro.module').then(m => m.RegistroModule) },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
