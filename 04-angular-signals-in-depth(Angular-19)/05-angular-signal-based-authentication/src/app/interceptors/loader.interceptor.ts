import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {LoadingService} from '../services/loading.service';
import {finalize} from 'rxjs';
import {SkipLoading} from '../components/loading/skip-loading.component';

export const loaderInterceptor: HttpInterceptorFn =
  (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if(req.context.get(SkipLoading)) {
    return next(req);
  }
  const loadingService = inject(LoadingService);
  loadingService.loadingOn();

  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff();
    })
  );
};
