import {Component, inject} from '@angular/core';

import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LoadingIndicatorComponent} from '../loading/loading.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {EditCourseDialogData} from '../../models/edit-course-dialog.data.model';
import {firstValueFrom} from 'rxjs';
import {Course} from '../../models/course.model';
import {CoursesService} from '../../services/courses.service';
import {CoursesServiceWithFetch} from '../../services/courses-fetch.service';

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [
    LoadingIndicatorComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {
  courseService = inject(CoursesService);
  //courseService = inject(CoursesServiceWithFetch);
  dialogRef = inject(MatDialogRef)
  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    title: [''],
    longDescription: [''],
    category: [''],
    iconUrl: ['']
  });

  constructor() {
    this.form.patchValue({
      title: this.data?.course?.title,
      longDescription: this.data?.course?.longDescription,
      category: this.data?.course?.category,
      iconUrl: this.data?.course?.iconUrl,
    })
  }

  async onSave() {
    const courseProps = this.form.value as Partial<Course>;
    if(this.data?.mode === 'update') {
      await this.updateCourse(this.data?.course!.id, courseProps);
    }
    else if (this.data?.mode === 'create') {
      await this.createCourse(courseProps);
    }
  }

  async updateCourse(courseId : string, course: Partial<Course>) {
    try {
      const updatedCourse = await this.courseService.updateCourse(course, courseId);
      this.dialogRef.close(updatedCourse);
    } catch (error) {
      console.error(error);
      alert("Error updating course");
    }
  }

  async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.courseService.createCourse(course);
      this.dialogRef.close(newCourse);

    } catch (error) {
      console.error(error);
      alert("Error creating course");
    }
  }


  onClose() {
    this.dialogRef.close({tile: 'Hello World'});
  }


}

export async function openEditCourseDialog(
  dialog: MatDialog,
  data: EditCourseDialogData) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = '400px';
  config.data = data;
  const close$ = dialog
    .open(EditCourseDialogComponent, config)
    .afterClosed();

  return firstValueFrom(close$);
}
