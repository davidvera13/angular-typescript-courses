import {Component, contentChild, contentChildren, effect, ElementRef, input, model} from '@angular/core';
import {CourseCategory} from '../../models/course-category.model';

@Component({
  selector: 'course-category-combobox',
  standalone: true,
  imports: [],
  templateUrl: './course-category-combobox.component.html',
  styleUrl: './course-category-combobox.component.scss'
})
export class CourseCategoryComboboxComponent {
  defaultLabel = input.required<string>();
  // writable signal: send values to parent component => 2 way binding
  value = model<CourseCategory>();

  //title = contentChild<ElementRef>("myTitle");
  title = contentChildren<ElementRef>("myTitle");

  constructor() {
    effect(() => {
      console.log('this title', this.title());
    })

  }

  // it is a string o type CourseCategory
  onCategoryChanged(category: String) {
    this.value.set(category as CourseCategory);
  }
}
