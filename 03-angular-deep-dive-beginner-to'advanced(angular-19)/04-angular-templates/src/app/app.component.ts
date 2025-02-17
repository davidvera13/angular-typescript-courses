import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CourseCardComponent} from './components/course-card/course-card.component';
import { COURSES } from './fakedb-data';
import {Course} from './model/course';
import {CourseImageComponent} from './components/course-image/course-image.component';
import {NgTemplateOutlet} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [
    CourseCardComponent,
    CourseImageComponent,
    NgTemplateOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  courses: Course[] = [...COURSES];

  constructor() {
  }

  onCourseSelected($event: Course) {
    console.log('CourseSelected - click event bubbled...', $event);
  }
}
