import {ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {CoursesService} from "./courses.service";
import {first, Observable} from "rxjs";
import {Course} from "../model/course";
import {LessonSummary} from "../model/lesson-summary";
import {LessonDetail} from "../model/lesson-detail";

@Injectable()
export class LessonDetailResolver implements Resolve<LessonDetail> {
  constructor(private coursesService: CoursesService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<LessonDetail> {
    // throw new Error("Method not implemented.");//localhost; 4200/courses/angular-router-course/leesons/17
    const courseUrl = route.parent.paramMap.get('courseUrl');
    const lessonSeqNo = route.paramMap.get('lessonSeqNo');
    return this.coursesService.loadLessonDetail(courseUrl, lessonSeqNo)
      .pipe(first());
    }
}
