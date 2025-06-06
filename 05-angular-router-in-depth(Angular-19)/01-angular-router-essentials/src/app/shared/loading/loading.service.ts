import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject,of} from 'rxjs';
import {concatMap, finalize, tap} from 'rxjs/operators';


@Injectable({
  providedIn: "root"
})
export class LoadingService {

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    constructor() {
        console.log("Loading service created ...");
    }

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        return of(null)
            .pipe(
                tap(() => this.loadingOn()),
                concatMap(() => obs$),
                finalize(() => this.loadingOff())
            );
    }

    loadingOn() {
      this.loadingSubject.next(true);
    }

    loadingOff() {
      // it loads too quickly
      setTimeout(() => {
        this.loadingSubject.next(false);
      }, 500)

    }

}
