import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {
  @Input() paraMostrar: boolean;

  constructor() {
    this.paraMostrar = false;
   }

  ngOnInit(): void {
  }

  renderizar = (mostrar: boolean) => {
    this.paraMostrar = !mostrar;
  }

}
