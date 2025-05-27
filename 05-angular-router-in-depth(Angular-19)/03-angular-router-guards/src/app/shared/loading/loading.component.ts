import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from './loading.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  Router
} from "@angular/router";

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css'],
    standalone: false
})
export class LoadingComponent implements OnInit {

  @Input()
  routing: boolean = false;

  @Input()
  detectRoutingOngoing = false;

  constructor(
    public loadingService: LoadingService,
    private router: Router) {

  }

  ngOnInit() {
    if(this.detectRoutingOngoing) {
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          this.loadingService.loadingOn();

        }
        else if (
          event instanceof NavigationError ||
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof RouteConfigLoadEnd) {
          this.loadingService.loadingOff();
          setTimeout(() => {}, 500);

        }
      });
    }

  }


}
