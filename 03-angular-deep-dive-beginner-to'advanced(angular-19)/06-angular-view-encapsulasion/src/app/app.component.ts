import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CourseCardComponent} from './components/course-card/course-card.component';
import { COURSES } from './fakedb-data';
import {Course} from './model/course';
import {CourseImageComponent} from './components/course-image/course-image.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {NgxUnlessDirective} from './directives/ngx-unless.directive';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [
    CourseCardComponent,
    CourseImageComponent,
    HighlightedDirective,
    NgxUnlessDirective,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  courses: Course[] = [...COURSES];

  @ViewChild(HighlightedDirective) highlighted!: HighlightedDirective;

  constructor() {
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.highlighted);
  }


  onCourseSelected($event: Course) {
    console.log('CourseSelected - click event bubbled...', $event);
  }

  onToggle($event: boolean) {
    console.log('Toggle event', $event);
  }
}
