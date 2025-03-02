import {Component, Input} from '@angular/core';

@Component({
  selector: 'course-title-elt',
  // imports: [],
  templateUrl: './course-title-elt.component.html',
  styleUrl: './course-title-elt.component.css',
  standalone: false
})
export class CourseTitleEltComponent {
  @Input()
  title!: string;

  constructor() { }

  ngOnInit() {
  }
}
