import { ApplicationConfig, provideZoneChangeDetection, inject, ErrorHandler } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderInterceptorInterceptor } from './loader-interceptor.interceptor';
import { httpInterceptorInterceptor } from './http-interceptor.interceptor';
import { GlobalErrorHandler } from './services/global-error-handler';
import { AlertService } from './services/alert.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([loaderInterceptorInterceptor, httpInterceptorInterceptor])),
   {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  }
  ],
};
