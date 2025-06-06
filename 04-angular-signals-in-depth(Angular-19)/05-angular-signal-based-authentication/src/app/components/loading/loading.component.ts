import {Component, inject, Signal} from "@angular/core";
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LoadingService} from '../../services/loading.service';

@Component({
    selector: "loading",
    templateUrl: "./loading.component.html",
    styleUrls: ["./loading.component.scss"],
  imports: [
    MatProgressSpinner
  ]
})
export class LoadingIndicatorComponent {
  loadingService = inject(LoadingService);
  loading: Signal<boolean> = this.loadingService.loading;


}
