
import { Injectable } from '@angular/core';
import { UsersService } from '../_services/users.service';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private userService: UsersService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`in error interceptor`);
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.userService.logout();
        location.reload();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }

}
