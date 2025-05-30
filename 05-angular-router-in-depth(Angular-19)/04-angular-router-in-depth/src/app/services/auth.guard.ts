import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot, UrlTree
} from "@angular/router";
import {AuthStore} from "./auth.store";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authStore: AuthStore,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>  {
    return this.checkIfAuthenticated();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }


  private checkIfAuthenticated() {
    return this.authStore.isLoggedIn$
      .pipe(
        map(loggedIn =>
          loggedIn? true: this.router.parseUrl('/login') )
      );
  }
}
