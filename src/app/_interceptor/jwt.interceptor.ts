
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

      // test token expired
      const tokenExpired = this.userService.isTokenExpired(currentUser.token);
      if (tokenExpired) {
        this.userService.logout();
        location.reload();
        alert(`Please login again`);
      }


      // add token to request header
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(req);
  }
}





