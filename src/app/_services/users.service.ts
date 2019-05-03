import { Injectable } from '@angular/core';
import { UsersApiService } from '../_api-request/users-api.service';
import { User } from '../model/user';
import { map } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private userAPI: UsersApiService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }



  login(userName: string, password: string) {

    return this.userAPI.login(userName, password)
      .pipe(map(res => {

        // get user
        const user = res.body;

        // // get token assign to user
        // console.log(res.headers.get('Authorization'));
        // const token = res.headers.get('Authorization').split(' ')[1];
        // user.token = token;

        let date = this.getTokenExpirationDate(user.token);
        console.log(date);

        console.log(this.isTokenExpired(user.token));

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

        return user;

      }));


  }

  register(user: User) {
    return this.userAPI.register(user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {

    if (!token) {
      token = this.currentUserValue.token;
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }


}

