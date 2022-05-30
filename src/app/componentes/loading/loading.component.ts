import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
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
