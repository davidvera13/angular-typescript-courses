import {Directive, EventEmitter, Host, HostBinding, HostListener, Input, Output} from '@angular/core';
import {UsersService} from "../services/users.service";

@Directive({
    selector: '[highlighted]',
    exportAs: 'hl',
    standalone: false
})
export class HighlightedDirective {

    @Input('highlighted')
    isHighlighted = false;

    @Output()
    toggleHighlight = new EventEmitter();

    constructor(@Host() private usersService: UsersService) {
        console.log('Directive created..');
        console.log('usersService highlighted', this.usersService);
    }

    @HostBinding('class.highlighted')
    get cssClasses() {
        return this.isHighlighted;
    }

    @HostListener('mouseover', ['$event'])
    mouseOver($event) {

        console.log($event);

        this.isHighlighted = true;
        this.toggleHighlight.emit(this.isHighlighted);
    }

    @HostListener('mouseleave')
    mouseLeave() {
        this.isHighlighted = false;
        this.toggleHighlight.emit(this.isHighlighted);
    }

    toggle() {
        this.isHighlighted = !this.isHighlighted;
        this.toggleHighlight.emit(this.isHighlighted);
    }



}
