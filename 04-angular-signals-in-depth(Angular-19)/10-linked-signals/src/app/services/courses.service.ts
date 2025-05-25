import {inject, Injectable} from "@angular/core";
import {Course} from '../models/course.model';
import {environment} from '../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {GetCoursesResponse} from '../models/get-courses.response';
import {firstValueFrom} from 'rxjs';


@Injectable({
  providedIn: "root"
})
export class CoursesService {
  env = environment;
  http = inject(HttpClient);

  // we won't return Observable<Course[]>, we'll use Promises, will work with async & await
  async getCourses(): Promise<Course[]> {
    const response$ = this.http
      .get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
        // ,
        // using HttpContext prevent use of the interceptor
        //{
        //  context: new HttpContext().set(SkipLoading, true)
        //});
    const response = await firstValueFrom(response$); // convert observable to promise
    return response.courses;
  }

  async createCourse(
    course: Partial<Course>): Promise<Course> {
    const response$ = this.http
      .post<Course>(`${this.env.apiRoot}/courses`, course);
    return firstValueFrom(response$);
  }

  async updateCourse(
    course: Partial<Course>,
    courseId: string): Promise<Course> {
    const response$ = this.http
      .put<Course>(`${this.env.apiRoot}/courses/${courseId}`, course);
    return firstValueFrom(response$);
  }

  async deleteCourse(courseId: string): Promise<void> {
    const response$ = this.http
      .delete<void>(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(response$);
  }

  async getCourseById(courseId: string): Promise<Course> {
    const response$ = this.http.get<Course>(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(response$);
  }
}
