import {Injectable} from "@angular/core";
import {Course} from '../models/course.model';
import {environment} from '../../environments/environment.development';


@Injectable({
  providedIn: "root"
})
export class CoursesServiceWithFetch {
  env = environment;

  // we won't return Observable<Courses>, we'll use Promises, will work with async & await
  async getCourses(): Promise<Course[]> {
    const response = await fetch(`${this.env.apiRoot}/courses`);
    const payload = await response.json();
    // we don't return Promise.resolve(payload);
    return payload.courses;
  }

  async createCourse(
    course: Partial<Course>): Promise<Course> {
    const response = await fetch(
      `${this.env.apiRoot}/courses`,
      {
        method: "POST",
        headers: {
          ContentType: "application/json"
        },
        body: JSON.stringify(course)
      }
    );
    return await response.json();
  }

  async updateCourse(
    course: Partial<Course>,
    courseId: string): Promise<Course> {
    const response = await fetch(
      `${this.env.apiRoot}/courses/${courseId}`,
      {
        method: "PUT",
        headers: {
          ContentType: "application/json"
        },
        body: JSON.stringify(course)
      }
    );
    return await response.json();
  }

  async deleteCourse(courseId: string): Promise<void> {
    await fetch(
      `${this.env.apiRoot}/courses/${courseId}`,
      {
        method: "DELETE"
      }
    );

  }

}
