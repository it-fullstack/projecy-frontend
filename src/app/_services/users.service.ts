import { Injectable } from '@angular/core';
import { UsersApiService } from '../_api-request/users-api.service';
import { User } from '../model/user';
import { map } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';

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
        console.log(res);

        // get user
        const user = res.body;

        // // get token assign to user
        // console.log(res.headers.get('Authorization'));
        // const token = res.headers.get('Authorization').split(' ')[1];
        // user.token = token;

        console.log(user.token);

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


}

