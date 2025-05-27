import {Injectable} from "@angular/core";
import {PreloadingStrategy, Route} from "@angular/router";
import {Observable, of} from "rxjs";

// when to know if angular loads modules or not ?
// which module should be loaded and when
@Injectable()
export class AppPreloadingStrategy implements PreloadingStrategy {

    preload(
      route: Route,
      fn: () => Observable<any>): Observable<any> {
        //throw new Error("Method not implemented.");
      if (route.data["preload"]) {
        return fn();
      }
      else {
        of(null);
      }
    }

}
