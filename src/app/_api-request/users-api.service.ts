import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UsersApiService {


  constructor(private http: HttpClient) {

  }

  login(userName: string, password: string) {

    return this.http.post<User>(environment.apiUrl + `login`, { userName, password }, { observe: `response` });
  }


  register(user: User) {
    return this.http.post(environment.apiUrl + `register`, user);
  }






}
