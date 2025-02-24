import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DoCheck,
  Inject,
  InjectionToken,
  OnInit,
  Optional,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Course} from './model/course';
import {Observable} from 'rxjs';
import {CoursesService} from "./services/courses.service";
import {APP_CONFIG, AppConfig, CONFIG_TOKEN} from "./config";
import {COURSES} from "../fakedb-data";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
  providers: [
    {
      provide: CONFIG_TOKEN,
      useFactory: ()=> APP_CONFIG
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, DoCheck {
  courses$: Observable<Course[]>;
  courses: Course[];

  constructor(
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private changeDetectorRef: ChangeDetectorRef,
    private coursesService: CoursesService) {
    // this.courses = COURSES;
  }

  ngOnInit() {
    console.log('AppComponent ngOnInit called > this.config ', this.config);
    this.coursesService.loadCourses().subscribe(courses => {
      this.courses = courses;
      this.changeDetectorRef.markForCheck();
    });

    //this.courses$ = this.coursesService.loadCourses()
  }

  ngDoCheck(): void {
    console.log('AppComponent ngDoCheck called');
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
  }
}
