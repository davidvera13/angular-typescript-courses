import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CourseCardComponent} from './components/course-card/course-card.component';
import { COURSES } from './fakedb-data';
import {Course} from './model/course';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe, JsonPipe, KeyValuePipe,
  LowerCasePipe,
  NgForOf, PercentPipe, SlicePipe,
  TitleCasePipe,
  UpperCasePipe
} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CourseCardComponent,
    NgForOf,
    DatePipe,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DecimalPipe,
    CurrencyPipe,
    PercentPipe,
    SlicePipe,
    JsonPipe,
    KeyValuePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string;
  // @empty is called instead of @for
  // courses: Course[] = [];
  courses: Course[] = [...COURSES];
  // import some courses hard coded and statically
  coreCourse: Course = COURSES[1];
  // rxjsCourse: Course = COURSES[2];
  // ngRxCourse: Course = COURSES[3]
  startDate : Date;
  price: number
  roundPrice: number
  vatRate: number;
  entries;
  course: Record<string, string>;

  constructor() {
    this.title = 'angular Core DEEP dive';
    this.startDate = new Date(2020, 2, 2);
    this.price = 30.2553;
    this.roundPrice = 13;
    this.vatRate = 0.196;

    this.entries = Object.entries(this.coreCourse);

    this.course = this.entries.reduce((acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    }, {} as Record<string,string>);


  }

  onCardClicked() {
    console.log('AppComponent - click event bubbled...');
  }

  onCourseSelected($event: Course) {
    console.log('CourseSelected - click event bubbled...', $event);
  }

  //trackCourse(index: number, course: Course) {
  //  return course.id;
  //}
}
