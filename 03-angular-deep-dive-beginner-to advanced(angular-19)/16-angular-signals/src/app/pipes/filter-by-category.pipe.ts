import { Pipe, PipeTransform } from '@angular/core';
import {Course} from '../model/course';

@Pipe({
  name: 'filterByCategory',
  pure: false, // not recommended: pipe will be triggered if we update on element of the array
  standalone: true
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(coursesInput: Course[], courseCategory: string): unknown {
    return coursesInput
      .filter(course => course.category === courseCategory);
  }

}
