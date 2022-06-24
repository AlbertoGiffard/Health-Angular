import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIluminar]'
})
export class IluminarDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { 
    renderer.setStyle(el.nativeElement, 'fontSize', '50px');
    renderer.setStyle(el.nativeElement, 'color', 'blue');
  }
}
