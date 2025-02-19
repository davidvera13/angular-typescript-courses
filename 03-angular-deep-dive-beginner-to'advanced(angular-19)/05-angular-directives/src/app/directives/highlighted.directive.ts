import {
  AfterViewInit,
  booleanAttribute,
  Directive, EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Directive({
  selector: '[highlighted]',
  exportAs: 'hl'
})
export class HighlightedDirective implements AfterViewInit {
  @Input({transform: booleanAttribute, alias: 'highlighted'})
  isHighlighted= false;

  @Output()
  toggleHighlight: EventEmitter<any>;

  constructor() {
    this.isHighlighted = false;
    this.toggleHighlight = new EventEmitter()
  }

  ngAfterViewInit() {
    this.isHighlighted = false;
    console.log('ngAfterViewInit > isHighlighted', this.isHighlighted);
  }

  @HostBinding('class.highlighted')
  get cssClasses() {
    console.log('cssClasses called');
    return this.isHighlighted ? 'highlighted' : '';
  }

  @HostBinding('style.border')
  get borderStyle() {
    console.log('borderStyle called');
    return this.isHighlighted ? "2px dotted blue" : "";
  }

  @HostBinding('attr.disabled')
  get disabled() {
    console.log('disabled called');
    return !this.isHighlighted ? 'disabled' : '';
  }


  @HostListener('mouseover', ['$event'])
  mouseOver($event: MouseEvent) {
    console.log($event);
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);

  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  // Angular Directive Export As syntax
  toggle() {
    console.log('toggle');
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);

  }

}
