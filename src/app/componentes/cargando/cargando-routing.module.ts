import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargandoComponent } from './cargando.component';

const routes: Routes = [{ path: '', component: CargandoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargandoRoutingModule { }
