import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppConfig } from '../app-config.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl = '';
  userMgtApiUrl = '';
  userRole: string = '';
  isloggedin = false;
  loggedinUser: any = null;
  loggedinId = '';
  loggedInUserDetails = new BehaviorSubject(null);

  constructor(private http: HttpClient, public config: AppConfig) {
    //this.apiUrl = config.apiUrl;
    //this.userMgtApiUrl = config.userMgtApiUrl;
    console.log(this.apiUrl);
  }

  isLoggedIn() {
    // return true
    // return sessionStorage.getItem('UserInfo') ? true : false;
    const loggedinUser = sessionStorage.getItem('userToken');
    if (loggedinUser) {

      const userToken =loggedinUser;
      const decodedToken: any = jwt_decode(userToken);
      console.log(decodedToken);

      const expiry = decodedToken.exp;
      //

      if (expiry * 1000 >= Date.now()) {
        const userEmail = decodedToken.userid.toLowerCase();

        return this.fetchUserDetails(userToken).subscribe((data) => {
          if (data) {
            sessionStorage.setItem('userDetails', JSON.stringify(data));
            this.loggedInUserDetails.next(data);
            return true;
          }
          return false;
        });
      }
      return false;
    }

    return false;
  }

  getUserDeatils() {
   const user = sessionStorage.getItem('UserInfo');
    return user ? JSON.parse(user) : ''
  }

  getUserObj() {
    return this.loggedInUserDetails;
  }

  login(obj: any, url: any): Observable<any> {
    const formData = new FormData();
    formData.append('userid', obj.username);
    formData.append('password', obj.password);
    const loginObj = {
      userName: obj.username,
      password: obj.password,
    };
    console.clear();
    //return this.http.get<any>(`${this.apiUrl}${url}?userid=${encodeURIComponent(obj.username)}&password=${encodeURIComponent(obj.password)}`).pipe(
    return this.http.post<any>(`${this.apiUrl}${url}`, formData).pipe(
      map((el) => {
        console.log(el);
        let userToken = '';

        if (el.Value) {
          userToken = el.Value;
          sessionStorage.setItem('UserInfo', JSON.stringify(el));
          sessionStorage.setItem('userToken', userToken);
          return el;
        }
        return throwError('Invalid Value');
      })
    );
  }

  register(user: any): Observable<boolean> {
    if (user) {
      return of(true);
    }
    return of(false);
  }

  logout() {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('UserInfo');
    sessionStorage.removeItem('userDetails');
  }

  // invokelogin(param): Observable<any> {
  //   console.log("param:{}", param)
  //   return this.http.post<any>(`${this.apiUrl}signin`, param);
  // }

  // setNewPassword(obj): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}auth/change-password`, obj);
  //   //return of({status: 'Success', message:'Your password updated successfully'})
  // }

  fetchUserDetails(value: any): Observable<any> {
    const decodedToken: any = jwt_decode(value);

    return this.http.get<any>(`${this.userMgtApiUrl}user/user_master_details/${decodedToken.userid.toLowerCase()}`)
      .pipe(
        map((ev) => {
          console.log('user-------->', ev);
          if (ev.success) {
            return ev.response;
          } else {
            return { message: 'NOUSERFOUND' };
          }

          // sessionStorage.setItem('dqUserId', ev[0].adminInfo.dqUserId);
        })
      );
  }
}
