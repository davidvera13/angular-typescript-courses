import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {LessonsComponent} from "./components/lessons/lessons.component";
import {ResourceDemoComponent} from "./components/resource-demo/resource-demo.component";
import {LinkedSignalDemoComponent} from "./components/linked-signals-demo/linked-signal-demo.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "lessons",
    component: LessonsComponent
  },
  {
    path:"shopping-cart",
    component: LinkedSignalDemoComponent
  },
  {
    path: "resource-demo",
    component: ResourceDemoComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
