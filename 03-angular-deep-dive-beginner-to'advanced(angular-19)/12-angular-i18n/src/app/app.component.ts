import {Component, DoCheck, OnInit} from '@angular/core';
import {Course} from './model/course';
import {Observable} from 'rxjs';
import {CoursesService} from './services/courses.service';
import {COURSES} from '../fakedb-data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements
    OnInit, DoCheck {
  courses$: Observable<Course[]>;
  courses: Course[];
  coursesCount: number;

  // first
  constructor(
    private coursesService: CoursesService) {
    // 10 courses
    this.courses = COURSES;
    // no courses
    // this.courses = [];
    // no courses
    // this.courses = [COURSES[1]];
    this.coursesCount = this.courses.length;
  }

  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }


  ngDoCheck(): void {
  }

  onCourseSave(course: Course) {
    this.coursesService.saveCourse(course).subscribe(
      () => console.log('success')
    );

  }

  onEditCourse() {
    // category is updated in template but pipe is not triggered unless pipe is not pure
    this.courses[1].category = 'ADVANCED';

    // we need to update an element of the array and remplace original array
    // const newCourses = [...this.courses];
    // newCourses[1].category = 'ADVANCED';
    // this.courses = newCourses;
  }
}
