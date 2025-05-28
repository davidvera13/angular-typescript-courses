import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {NgIf} from "@angular/common";
import {ActivatedRoute, RouterOutlet} from "@angular/router";


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  imports: [
    NgIf,
    RouterOutlet
  ],
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
    course: Course;
    couponCode: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.course = this.route.snapshot.data['course'];
      // http://localhost:4200/courses/angular-router-course?couponCode=NEW_YEAR
      this.couponCode = this.route.snapshot.queryParamMap.get("couponCode");
      // use subscription if query param may change and of we need to follow value changes
      // this.route.queryParamMap.subscribe(...)
    }

    confirmExit(): boolean {
      return confirm(`Are you sure to exit ${this.course.description }`);
    }


}











