import {
  afterNextRender,
  Component, computed, effect, ElementRef, inject, Injector, signal, Signal, viewChild, WritableSignal
} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {Course, sortCoursesBySeqNo} from '../../models/course.model';
import {CoursesService} from '../../services/courses.service';
import {CoursesServiceWithFetch} from '../../services/courses-fetch.service';
import {CoursesCardListComponent} from '../courses-card-list/courses-card-list.component';
import {openEditCourseDialog} from '../edit-course-dialog/edit-course-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MessagesService} from '../../services/messages.service';
import {MatTooltip} from '@angular/material/tooltip';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {catchError, from, interval, startWith} from 'rxjs';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent,
    MatTooltip,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // injector replace constructor base injection
  messageService = inject(MessagesService);
  //courseService: CoursesService = inject(CoursesServiceWithFetch);
  courseService: CoursesService = inject(CoursesService);
  dialog = inject(MatDialog);

  // note: # indicates property is private
  #courses: WritableSignal<Course[]> = signal<Course[]>([]);
  // convert a signal to observable
  course$ = toObservable(this.#courses);
  courseObs$ = from(this.courseService.getCourses())
  injector = inject(Injector);



  beginnersList = viewChild<CoursesCardListComponent>("beginnersList")
  tootType =  viewChild("beginnersList", {
     read: MatTooltip
    });

  //beginnersList = viewChild("beginnersList", {
  //  read: ElementRef
  //});

  constructor() {
    // behave like ngOnInit(): called one time
    afterNextRender(() => {
      this.getCourses().then((courses) =>
        console.log('Courses loaded: ', this.#courses()))
    })

    effect(() => {
      console.log("beginnerList loaded", this.beginnersList());
      console.log("Tools type loaded", this.tootType());
    });

    effect(() => {
      console.log('beginnerCourses', this.beginnerCourses());
      console.log('advancedCourses', this.advancedCourses());
    });


    this.course$.subscribe(courses => {
      console.log("reading courses$: ", courses);
    })
  }

  //ngOnInit() {

  // this.getCourses().then((courses) => {
  //    console.log("***************")
  //    console.log('Courses loaded: ', this.courses())
  //  })
  //}
  async getCourses(){
    // note: turning on / off loader can be cumbersome, we can use interceptor more easily
    try {
     //this.loadingService.loadingOn();
      const courses = await this.courseService.getCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    } catch (error) {
      //alert("Something went wrong");
      this.messageService.showMessage('Error loading courses', 'error');
      console.error(error);
    }
    // finally {
    //  this.loadingService.loadingOff();
    //}

  }

  beginnerCourses: Signal<Course[]> = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'BEGINNER');
  });

  advancedCourses: Signal<Course[]> = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'ADVANCED');
  });

  onCourseUpdated(updatedCourse: Course) {
    // replace course in list of courses
    const courses = this.#courses();
    const updatedCourses = courses
      .map(course => course.id === updatedCourse.id ?
        updatedCourse : course);
    this.#courses.set(updatedCourses);
  }

  async onCourseDeleted(courseId: string) {
    try {
      await this.courseService.deleteCourse(courseId);
      const courses = this.#courses();
      const updatedCourses = courses.filter(course => course.id != courseId);
      this.#courses.set(updatedCourses);
    }
    catch (error) {
      console.error(error);
      //alert("Something went wrong");
      this.messageService.showMessage('Error deleting courses', 'error');
    }
  }

  async onAddCourse() {
    // opening a dialog
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: 'create',
        title: 'Add Course',
      })

    const newCourses = [
      ...this.#courses(), newCourse
    ];

    this.#courses.set(newCourses);
  }

  onConvertToObservable() {
    //ERROR RuntimeError: NG0203: toObservable() can only be used within an injection context such as a constructor,
    // a factory function, a field initializer, or a function used with `runInInjectionContext`. Find more at
    // https://angular.dev/errors/NG0203
    //const courses$ = toObservable(this.#courses)

    const courses$ = toObservable(this.#courses, {
      injector: this.injector,
    })
    courses$.subscribe(courses => {
      console.log("reading courses$ onClick: ", courses);
    })

    // other case =
    const numbers = signal(0);
    numbers.set(1);
    numbers.set(2);
    numbers.set(3);

    // toObservable uses effect to monitor changes
    const numbers$ = toObservable(numbers, {
      injector: this.injector
    });
    numbers.set(4);

    numbers$.subscribe(val => {
      console.log(`numbers$: `, val)
    })
    // only the last value will trigger subscription
    numbers.set(5);
  }

  onConvertToSignal() {
    const courses = toSignal(this.courseObs$, {
      injector: this.injector,
    });
    effect(() => {
      console.log("courses() from observables: ", courses());
    }, {
      injector: this.injector,
    });
  }
  onConvertToSignalWithConfig() {
    //const numbers$ = interval(1000);
    // forcing init value
    const numbers$ = interval(1000)
      .pipe(
        startWith(0)
      );
    const numbers = toSignal(numbers$, {
      injector: this.injector,
      requireSync: true
      //initialValue: 0
    })

    effect(() => {
      // 1st value is undefined unless initial value is set OR requireSync is set to TRUE and observable has an initial
      // value
      console.log("numbers: ", numbers());
    }, {
      injector: this.injector,
    })
  }

  onConvertToSignalWithError() {
    try {
      const courses$ = from(this.courseService.getCourses())
        .pipe(
          catchError(err => {
            // will be triggers if we stop backend server
            console.log(`Error caught in catchError`, err)
            throw err;
          })
        );
      const courses = toSignal(courses$, {
        injector: this.injector,
        rejectErrors: true
      })
      effect(() => {
        console.log(`Courses: `, courses())
      }, {
        injector: this.injector
      })

      setInterval(() => {
        console.log(`Reading courses signal: `, courses())
      }, 1000)

    }
    catch (err) {
      console.log(`Error in catch block: `, err)
    }
  }
}
