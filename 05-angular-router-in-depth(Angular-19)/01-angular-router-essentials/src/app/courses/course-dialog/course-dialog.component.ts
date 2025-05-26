import { Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup, ReactiveFormsModule} from "@angular/forms";
import moment from 'moment';
import {CoursesService} from "../services/courses.service";
import {LoadingService} from "../../shared/loading/loading.service";
import {MessagesService} from "../../shared/messages/messages.service";
import {SharedModule} from "../../shared/shared.module";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";


@Component({
  imports: [
    MatDialogActions,
    SharedModule,
    MatDialogContent,
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatInput,
    MatDialogTitle,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatButton
  ],
  providers: [
    LoadingService,
    MessagesService
  ],
  selector: 'course-dialog',
  styleUrls: ['./course-dialog.component.css'],
  templateUrl: './course-dialog.component.html'
})
export class CourseDialogComponent {

    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private courses: CoursesService) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    save() {

      const changes = this.form.value;

      this.courses.saveCourse(this.course.id, changes)
          .subscribe();

      this.dialogRef.close(changes);

    }

    close() {
        this.dialogRef.close();
    }

}
