import {Component, computed, effect, EffectRef, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {Course} from './model/course';
import {Observable} from 'rxjs';
import {CoursesService} from './services/courses.service';
import {COURSES} from '../fakedb-data';
import {CourseCardComponent} from './components/course-card/course-card.component';
import {CourseImageComponent} from './components/course-image/course-image.component';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {FilterByCategoryPipe} from './pipes/filter-by-category.pipe';
import {CounterService} from './services/counter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CourseCardComponent,
    CourseImageComponent,
    FilterByCategoryPipe,
    NgForOf,
    NgIf,
    JsonPipe
  ],
  standalone: true
})
export class AppComponent implements OnInit {
  // counter: number;
  counter: WritableSignal<number>;
  derivedCounter: Signal<number>;
  courseSignal: WritableSignal<{ id: number, title: string }>;
  courseTitlesSignal: WritableSignal<string[]>;
  private effectRef: EffectRef;

  multiplier: number;
  courses$: Observable<Course[]>;
  courses: Course[];

  coursesCount: number;
  // first
  constructor(
    private coursesService: CoursesService,
    protected counterService: CounterService) {
    // 10 courses
    this.courses = COURSES;
    this.coursesCount = this.courses.length;

    this.multiplier = 0;
    // signals
    this.counter = signal(0);
    this.derivedCounter = computed(() => {
      const counter = this.counter();
      // adding some logic: counter derived won't be updated at all...
      // this.multiplier will take init value, not updated one, condition is always false except if take const out of if statement
      if (this.multiplier >= 5) {
        // const counter = this.counter();
        return counter * 10;
      } else {
        return 0;
      }
    });
    // const readOnlySignal = this.counter.asReadonly(); // Signal<number> can't be modified...

    // onCleanup is a callback
    this.effectRef = effect((onCleanup) => {
      onCleanup(() => {
        console.log('Cleanup complete');
      });
      // we create a dependency ...
      const counterValue = this.counter();
      const derivedCounterValue = this.derivedCounter();
      console.log(`updated counter : ${counterValue} - derivedCounterValue ${derivedCounterValue}`);
    }, {
      // configuration
      manualCleanup: true
    });

    this.courseSignal = signal({
      id: 1, title: 'Signal is cool'
    });
    this.courseTitlesSignal = signal([
      'Angular for dummies',
      'Learning signals for dummy'
    ]);
  }

  // using method
  increment() {
    //  this.counter++;
    // this.counter.set(this.counter() + 1);
    this.counter.update(value => value + 1);
    // we are mutating a signal ...bad practice
    // this.courseSignal().title = 'Updated ??';
    // this.courseTitlesSignal().push('learning typescript');

    // good practice
    this.courseSignal.set({ id: 1, title: 'Increment' });
    this.courseTitlesSignal.update(courses => [...courses, 'learning typescript']);
  }


  ngOnInit() {
    console.log('AppComponent ngOnInit');
    this.courses$ = this.coursesService.loadCourses();
  }

  onCourseSave(course: Course) {
    this.coursesService.saveCourse(course).subscribe(
      () => console.log('success')
    );
  }

  incrementMultiplier() {
    this.multiplier++;
  }

  onCleanup() {
    // we need refence to effect
    this.effectRef.destroy();
  }
}
