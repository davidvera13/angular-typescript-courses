import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CourseComponent} from "./course/course.component";
import {CoursesResolver} from "./services/courses.resolver";
import {LessonDetailComponent} from "./lesson/lesson-detail.component";
import {LessonsListComponent} from "./lessons-list/lessons-list.component";
import {LessonsResolver} from "./services/lessons.resolver";
import {LessonDetailResolver} from "./services/lesson-detail.resolver";
import {AuthGuard} from "../services/auth.guard";
import {ConfirmExitGuard} from "../services/confirm-exit.guard";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: ":courseUrl",
    component: CourseComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canDeactivate: [ConfirmExitGuard],
    resolve: {
      course: CoursesResolver
    },
    children: [
      // http://localhost:4200/courses/angular-router-course/lessons
      {
        path: "",
        component: LessonsListComponent,
        resolve: {
          lessons: LessonsResolver
        }
      },
      // http://localhost:4200/courses/angular-router-course/lessons/1
      {
        path: "lessons/:lessonSeqNo",
        component: LessonDetailComponent,
        resolve: {
          lesson: LessonDetailResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    CoursesResolver,
    LessonsResolver,
    LessonDetailResolver,
    AuthGuard,
    ConfirmExitGuard
  ]
})
export class CoursesRoutingModule {



}
