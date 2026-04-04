import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // add token to all api calls
  let token = null;
  
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      //  handle unauthorised
      if (error.status === 401) {
        errorMessage = 'Unauthorized - Please log in again.';
        // Optional: Redirect to login
      } else if (error.status === 404) {
        errorMessage = 'Resource not found.';
      }

      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    }),
  );
};
