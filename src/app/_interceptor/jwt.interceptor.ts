
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UsersService } from '../_services/users.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private userService: UsersService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.userService.currentUserValue;
    console.log(`in intercept`);
    if (currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    console.log(req.headers);

    return next.handle(req);
  }
}





