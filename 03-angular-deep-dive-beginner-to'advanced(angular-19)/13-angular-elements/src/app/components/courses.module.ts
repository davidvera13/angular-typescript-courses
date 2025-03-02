import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseCardComponent} from './course-card/course-card.component';
import {CourseImageComponent} from './course-image/course-image.component';
import {UsersService} from '../services/users.service';
import {HighlightedDirective} from '../directives/highlighted.directive';
import {NgxUnlessDirective} from '../directives/ngx-unless.directive';
import {FilterByCategoryPipe} from '../pipes/filter-by-category.pipe';
import {CourseTitleEltComponent} from './course-title-elt/course-title-elt.component';



@NgModule({
  imports: [
    CommonModule,
    FilterByCategoryPipe
  ],
  declarations: [
    CourseCardComponent,
    CourseImageComponent,
    CourseTitleEltComponent,
    HighlightedDirective,
    NgxUnlessDirective,
  ],
  exports: [
    CourseCardComponent,
    CourseImageComponent,
    CourseTitleEltComponent,
    FilterByCategoryPipe
  ],
  providers: [
    UsersService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoursesModule { }
