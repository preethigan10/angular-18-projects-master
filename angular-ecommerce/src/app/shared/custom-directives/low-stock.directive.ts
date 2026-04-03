import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLowStock]',
  standalone: true
})
export class LowStockDirective {

   @Input() appLowStock!: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.appLowStock == false) {
      this.renderer.addClass(this.el.nativeElement, 'text-danger');
    } else{
      this.renderer.removeClass(this.el.nativeElement, 'text-danger');
    }
  }

}
