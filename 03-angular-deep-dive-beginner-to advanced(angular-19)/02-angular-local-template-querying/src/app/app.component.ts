import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CourseCardComponent} from './components/course-card/course-card.component';
import { COURSES } from './fakedb-data';
import {Course} from './model/course';


@Component({
  selector: 'app-root',
  imports: [
    CourseCardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  courses: Course[] = [...COURSES];

  // if i have multiple components (loop)
  @ViewChildren('cardRef')
  courseCards!: QueryList<CourseCardComponent>;

  // instead of getting component, we can get ElementRef
  @ViewChild(
    CourseCardComponent //,{ read: ElementRef}
  )
  card!: CourseCardComponent;

  @ViewChild('wrapper')
  container!: ElementRef;

  // we are limited to the scope of the template, we can't get access to child component references
  @ViewChild('courseImage')
  courseImage!: ElementRef;

  // order 1
  constructor() {
    console.log('### constructor() called -> this.container', this.container);
  }

  // order 2
  ngAfterViewInit(): void {
    console.log('### ngAfterViewInit() called -> this.container', this.container);
    this.courseCards.changes.subscribe(cards => console.log(cards));
    // try to update value at afterviewInit stage
    // ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'Angular Core Deep Dive'.
    // Current value: 'Ooops, it will crash'.
    // Expression location: _CourseCardComponent component
    // avoid updates here
    // this.courses[0].description = 'Ooops, it will crash'
  }



  onCourseSelected($event: Course) {
    console.log('CourseSelected - click event bubbled...', $event);
    console.log('this.courseCards', this.courseCards.toArray());
    console.log('this.card', this.card);
    console.log('this.container', this.container);
    console.log('this.courseImage', this.courseImage);
  }

  onCourseEdited() {
    this.courses.push(
      {
        id: this.courses.length + 1,
        description: "Angular Core Deep Dive",
        iconUrl: './assets/images/angular-core-in-depth-small.png',
        longDescription: "A detailed walk-through of the most important part of Angular - the Core and Common modules",
        category: 'INTERMEDIATE',
        lessonsCount: 10
      },
    )

  }
}
