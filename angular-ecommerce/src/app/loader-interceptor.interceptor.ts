import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from './services/loader.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loaderInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  loader.show(); // start loader
  return next(req).pipe(
    finalize(() => loader.hide()), // stop loader
  );
};
