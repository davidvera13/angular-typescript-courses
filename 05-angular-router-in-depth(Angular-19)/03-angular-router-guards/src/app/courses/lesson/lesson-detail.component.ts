import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {LessonDetail} from "../model/lesson-detail";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AsyncPipe, NgIf} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'lesson',
  templateUrl: './lesson-detail.component.html',
  imports: [
    AsyncPipe,
    MatIcon,
    NgIf,
    SharedModule,
    RouterLink,
  ],
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  //lesson: LessonDetail;
  lesson$: Observable<LessonDetail>;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    console.log("Created LessonDetailComponent...");
  }

  ngOnInit() {
    // we retrieve data from the resolver !
    this.lesson$ = this.route.data.pipe(
      map(data => data['lesson']));
    //this.lesson = this.route.snapshot.data['lesson'];
    //console.log("lesson detail ", this.lesson);
  }

  previous(lesson: LessonDetail) {
    // url change but content not updated: lesson remains the same after component initialization
    this.router.navigate(
      ['lessons', lesson.seqNo - 1], {
        relativeTo: this.route.parent
      })
  }

  next(lesson: LessonDetail) {
    // url change but content not updated: lesson remains the same after component initialization
    this.router.navigate(
      ['lessons', lesson.seqNo + 1], {
        relativeTo: this.route.parent
      })
  }
}
