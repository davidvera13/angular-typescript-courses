import {Component, effect, ElementRef, inject, input, output, Signal, viewChildren} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from '../../models/course.model';
import {MatDialog} from '@angular/material/dialog';
import {openEditCourseDialog} from '../edit-course-dialog/edit-course-dialog.component';


@Component({
    selector: 'courses-card-list',
  imports: [
    RouterLink
  ],
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
  courses = input.required<Course[]>();
  dialog = inject(MatDialog);
  courseUpdated = output<Course>()
  courseDeleted = output<string>()
  courseCards: Signal<ReadonlyArray<ElementRef>> = viewChildren<ElementRef>("courseCard");

  constructor() {
    effect(() => {
      console.log("this.courseCards >", this.courseCards());
    });
  }


  async onEditCourse(course: Course) {
   const updatedCourse = await openEditCourseDialog(this.dialog, {
      mode: 'update',
      title: 'Update Course',
      course: course
    });
   // emit event
    this.courseUpdated.emit(updatedCourse);
    console.log("course to update", updatedCourse);
  }

  onDeleteCourse(course: Course) {
    this.courseDeleted.emit(course.id);
  }
}
