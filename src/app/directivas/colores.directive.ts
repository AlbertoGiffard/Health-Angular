import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appColores]'
})
export class ColoresDirective {
  @Input() appColores = '';
  
  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appColores);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
