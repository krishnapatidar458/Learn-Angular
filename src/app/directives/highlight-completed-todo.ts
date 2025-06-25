import { Directive, inject, input, ElementRef, effect } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]'
})
export class HighlightCompletedTodo {

  isCompleted = input(false);
  el = inject(ElementRef);

  stylesEffect = effect(() => {
    const element = this.el.nativeElement;
    if (this.isCompleted()) {
      element.style.backgroundColor = 'lightgreen';
      element.style.textDecoration = 'line-through';
      element.style.color = '#6c757d';
    } else {
      element.style.backgroundColor = 'transparent';
      element.style.textDecoration = 'none';
      element.style.color = '#000';
    }
  });

}
