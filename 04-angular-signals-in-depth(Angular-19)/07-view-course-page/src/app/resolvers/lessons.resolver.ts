import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import {Course} from '../models/course.model';
import {inject} from '@angular/core';
import {CoursesService} from '../services/courses.service';
import {Lesson} from '../models/lesson.model';
import {LessonsService} from '../services/lessons.service';

export const lessonsResolver: ResolveFn<Lesson[]> = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Promise<Lesson[]> => {
  const courseId = route.paramMap.get("id");
  if (!courseId) {
    return [];
  }
  const lessonsService = inject(LessonsService);
  return lessonsService.loadLessons({courseId});
}
