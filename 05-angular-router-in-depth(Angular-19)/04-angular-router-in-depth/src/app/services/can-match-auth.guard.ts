import {CanLoad, CanMatch, GuardResult, MaybeAsync, Route, Router, UrlSegment} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthStore} from "./auth.store";
import {first, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

// CanMatch replaces canLoad
@Injectable()
export class CanMatchAuthGuard  implements CanMatch  {

  constructor(private auth: AuthStore, private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.auth.isLoggedIn$.pipe(
      first(),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigateByUrl('/login').then();
        }
      }),
      map(loggedIn => loggedIn)
    );
  }
}
