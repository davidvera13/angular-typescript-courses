import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {Observable} from 'rxjs';
import {CoursesService} from "../services/courses.service";
import {map} from "rxjs/operators";
import {LoadingService} from "../../shared/loading/loading.service";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AsyncPipe} from "@angular/common";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  imports: [
    CoursesCardListComponent,
    MatTab,
    AsyncPipe,
    MatTabGroup
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private courses: CoursesService,
    private loading: LoadingService) {

  }

  ngOnInit() {

      this.reloadCourses();

  }

  reloadCourses() {
    const courses$ = this.courses.loadAllCourses();
      this.beginnerCourses$ = this.filterByCategory(courses$, "BEGINNER");
      this.advancedCourses$ = this.filterByCategory(courses$, "ADVANCED");
  }

  filterByCategory(courses$: Observable<Course[]>, category:string) {
    return this.loading.showLoaderUntilCompleted(courses$)
      .pipe(
        map(courses => {
          console.log(courses);
          return courses.filter(course => course.category == category).sort(sortCoursesBySeqNo)
        })
      );
  }

}


