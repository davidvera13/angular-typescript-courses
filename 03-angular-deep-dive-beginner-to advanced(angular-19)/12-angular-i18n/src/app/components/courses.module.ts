import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseCardComponent} from './course-card/course-card.component';
import {CourseImageComponent} from './course-image/course-image.component';
import {UsersService} from '../services/users.service';
import {HighlightedDirective} from '../directives/highlighted.directive';
import {NgxUnlessDirective} from '../directives/ngx-unless.directive';
import {FilterByCategoryPipe} from '../pipes/filter-by-category.pipe';



@NgModule({
  imports: [
    CommonModule,
    FilterByCategoryPipe
  ],
  declarations: [
    CourseCardComponent,
    CourseImageComponent,
    HighlightedDirective,
    NgxUnlessDirective,
  ],
  exports: [
    CourseCardComponent,
    CourseImageComponent,
    FilterByCategoryPipe
  ],
  providers: [
    UsersService,
  ]
})
export class CoursesModule { }
