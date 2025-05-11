import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../model/course";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

// singleton
@Injectable({
  // tree shakeable provider
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient
  ) {
    // constructor is called one time
    console.log('CoursesService created !');
  }

  loadCourses(): Observable<Course[]> {
    const params = new HttpParams()
      .set("page", 1)
      .set("pageSize", 10);

    return this.http
      .get<Course[]>('/api/courses', {params: params})
  }

  saveCourse(course: Course) {
    const headers = new HttpHeaders({
      "X-Auth": "userId",
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
    return this.http.put<Course>(
      `/api/courses/${course.id}`,
      course,
      { headers: headers }
    );
  }
}
