import {ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {CoursesService} from "./courses.service";
import {first, Observable} from "rxjs";
import {Course} from "../model/course";
import {LessonSummary} from "../model/lesson-summary";

@Injectable()
export class LessonsResolver implements Resolve<LessonSummary[]> {
  constructor(private coursesService: CoursesService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<LessonSummary[]> {
    // throw new Error("Method not implemented.");//localhost; 4200/courses/angular-router-course
    const courseUrl = route.paramMap.get('courseUrl')
    return this.coursesService.loadAllCourseLessonsSummary(courseUrl)
      .pipe(first());
    }
}
