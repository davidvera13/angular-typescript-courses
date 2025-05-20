import {
  afterNextRender,
  Component, computed, effect, inject, OnInit, signal, Signal, WritableSignal
} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {Course, sortCoursesBySeqNo} from '../../models/course.model';
import {CoursesService} from '../../services/courses.service';
import {CoursesServiceWithFetch} from '../../services/courses-fetch.service';
import {CoursesCardListComponent} from '../courses-card-list/courses-card-list.component';
import {openEditCourseDialog} from '../edit-course-dialog/edit-course-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // note: # indicates property is private
  #courses: WritableSignal<Course[]> = signal<Course[]>([]);

  // injector replace constructor base injection
  //courseService: CoursesService = inject(CoursesServiceWithFetch);
  courseService: CoursesService = inject(CoursesService);
  dialog = inject(MatDialog);

  constructor() {
    // behave like ngOnInit(): called one time
    afterNextRender(() => {
      this.getCourses().then((courses) =>
        console.log('Courses loaded: ', this.#courses()))
    })

    effect(() => {
      console.log('beginnerCourses', this.beginnerCourses());
      console.log('advancedCourses', this.advancedCourses());
    });

  }

  //ngOnInit() {

  // this.getCourses().then((courses) => {
  //    console.log("***************")
  //    console.log('Courses loaded: ', this.courses())
  //  })
  //}
  async getCourses(){
    //this.courseService.getCourses()
    //  .then(courses => {this.courses.set(courses)})
    //  .catch(...);
    try {
      const courses = await this.courseService.getCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }

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
      alert("Something went wrong");
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
}
