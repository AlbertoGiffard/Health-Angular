import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.component.html',
  styleUrls: ['./cargando.component.scss']
})
export class CargandoComponent implements OnInit {
  @Output() cargado: EventEmitter<boolean> = new EventEmitter<boolean>();
  show: boolean;

  constructor() { 
    this.show = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.show = false;
      this.cargado.emit(this.show);
    }, 300);
  }

}
