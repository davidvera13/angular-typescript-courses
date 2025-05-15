import {Component, effect, inject, signal} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {CourseCategoryComboboxComponent} from "../course-category-combobox/course-category-combobox.component";
import {LoadingIndicatorComponent} from '../loading/loading.component';

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


}
