import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, UrlSerializer, NoPreloading} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AboutComponent} from "./about/about.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {CanMatchAuthGuard} from "./services/can-match-auth.guard";


const routes: Routes = [
  // good practice : root path
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  // lazy loading: loading routes from child module
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canMatch: [CanMatchAuthGuard]
  },
  // good practice: page not found with discard must be last route defined...
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    CanMatchAuthGuard
  ]
})
export class AppRoutingModule {


}
