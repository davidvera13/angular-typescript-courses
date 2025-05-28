import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules, UrlSerializer, NoPreloading} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AboutComponent} from "./about/about.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {CanMatchAuthGuard} from "./services/can-match-auth.guard";
import {ChatComponent} from "./chat/chat.component";
import {AppPreloadingStrategy} from "./services/app-preloading-strategy";


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
    //canMatch: [CanMatchAuthGuard]
    data: {
      preload: false
    }
  },
  // secondary outlet
  {
    path: 'helpdesk-chat',
    component: ChatComponent,
    outlet: 'chat',
  },
  // good practice: page not found with discard must be last route defined...
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: AppPreloadingStrategy,
        enableTracing: true, // for debugging: very very cool
        useHash: true, // useful for always serving index.html whatever url is passed, we can use hash, we use hash to separate segments
        scrollPositionRestoration: 'enabled', // reset scroll to top on page change and keep previous when going forward
        // params Inheritance Strategy allow to use route in easier way when trying to get param map :
        // usually, we must declare parent param map :
        // const courseUrl = route.parent.paramMap.get('courseUrl');
        // const lessonSeqNo = route.paramMap.get('lessonSeqNo');
        // paramsInheritanceStrategy set to always allows us to use : const courseUrl = route.paramMap.get('courseUrl');
        // without parent and access in easier way to paramMap values
        paramsInheritanceStrategy: 'always'
      }
      //{ preloadingStrategy: PreloadAllModules })
      //{ preloadingStrategy: NoPreloading }) // by default
    )
  ],
  exports: [RouterModule],
  providers: [
    CanMatchAuthGuard
  ]
})
export class AppRoutingModule {


}
