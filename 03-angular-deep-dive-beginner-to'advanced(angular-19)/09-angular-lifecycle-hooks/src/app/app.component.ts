import {AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Inject, OnInit} from '@angular/core';
import {Course} from './model/course';
import {Observable} from 'rxjs';
import {CoursesService} from './services/courses.service';
import {APP_CONFIG, AppConfig, CONFIG_TOKEN} from './config';
import {COURSES} from '../fakedb-data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
  providers: [
    {
      provide: CONFIG_TOKEN,
      useFactory: () => APP_CONFIG
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements
    OnInit, DoCheck {
  courses$: Observable<Course[]>;
  courses: Course[];

  // first
  constructor(
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private changeDetectorRef: ChangeDetectorRef,
    private coursesService: CoursesService) {
    // console.log('AppComponent constructor called > this.config ', this.config);
    this.courses = COURSES;
  }

  // second: use for initialization
  // meant to be called by angular only
  ngOnInit() {
    // console.log('AppComponent ngOnInit called > this.config ', this.config);
    // this.coursesService.loadCourses().subscribe(courses => {
    //  this.courses = courses;
    //  this.changeDetectorRef.markForCheck();
    // });
    // this.courses$ = this.coursesService.loadCourses()
  }


  ngDoCheck(): void {
    // console.log('AppComponent ngDoCheck called');
    if (this.courses) {
      this.changeDetectorRef.markForCheck();
    }
  }

  onCourseSave(course: Course) {
    this.coursesService.saveCourse(course).subscribe(
      () => console.log('success')
    );

  }

  onEditCourse(event: any) {
    console.log('editCourse called', event);
    const course = this.courses[0];
    this.courses[0] = {...course, description: 'triggering ngOnChanges...'};
  }
}
