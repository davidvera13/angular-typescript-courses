import {Component, DoCheck, Injector, OnInit} from '@angular/core';
import {Course} from './model/course';
import {Observable} from 'rxjs';
import {CoursesService} from './services/courses.service';
import {COURSES} from '../fakedb-data';
import {createCustomElement} from '@angular/elements';
import {CourseTitleEltComponent} from './components/course-title-elt/course-title-elt.component';
import {CourseCardComponent} from './components/course-card/course-card.component';
import {CourseImageComponent} from './components/course-image/course-image.component';
import {NgForOf, NgIf} from '@angular/common';
import {FilterByCategoryPipe} from './pipes/filter-by-category.pipe';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CourseTitleEltComponent,
    CourseCardComponent,
    CourseImageComponent,
    FilterByCategoryPipe,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class AppComponent implements
    OnInit, DoCheck {
  courses$: Observable<Course[]>;
  courses: Course[];
  coursesCount: number;

  // first
  constructor(
    private coursesService: CoursesService,
    private injector: Injector) {
    // 10 courses
    this.courses = COURSES;
    // no courses
    // this.courses = [];
    // no courses
    // this.courses = [COURSES[1]];
    this.coursesCount = this.courses.length;
  }

  ngOnInit() {
    console.log('AppComponent ngOnInit');
    this.courses$ = this.coursesService.loadCourses();
    // browser custom element
    const htmlElement  = createCustomElement(
      CourseTitleEltComponent,
      {injector: this.injector}
    );
    // registering object to customElements
    customElements.define('course-title-elt', htmlElement);
  }


  ngDoCheck(): void {
  }

  onCourseSave(course: Course) {
    this.coursesService.saveCourse(course).subscribe(
      () => console.log('success')
    );

  }

  onEditCourse() {
    this.courses[1].category = 'ADVANCED';
  }
}
