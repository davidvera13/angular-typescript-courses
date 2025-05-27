import {ActivatedRouteSnapshot, CanDeactivate, GuardResult, MaybeAsync, RouterStateSnapshot} from "@angular/router";
import {CourseComponent} from "../courses/course/course.component";

export class ConfirmExitGuard implements CanDeactivate<CourseComponent> {
    canDeactivate(
      component: CourseComponent,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState: RouterStateSnapshot): boolean {
        //throw new Error("Method not implemented.");
      return component.confirmExit();
    }

}
