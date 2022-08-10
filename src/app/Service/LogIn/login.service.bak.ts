// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import {  HttpHeaders,HttpClient} from '@angular/common/http';

// import {UserDetail} from '../../Models/ReportsModel'
// import { AppConfig } from '../app-config.service';


// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {
//   apiUrl: any;
//   l3_URL: any;

//   //constructor(private http:HttpClient) { }
//   constructor(private http: HttpClient, public config: AppConfig) {
//     this.apiUrl = config.apiUrl;
//     this.l3_URL=config.l3_URL;
//   }

 
//   invokelogin(param) {  
//       const loginObj = {
//         email: param.username,
//         password: param.password,
//         //returnSecureToken: true
//       }
//       console.log("param:{}",param)
//     //return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFlaom4p6oE8FivN55cyv2gQKwsVA5IxY`, loginObj)
//     return this.http.post<any>(`${this.apiUrl}signin`,param);
//     //localhost:8681/api/india/signin
//     }
   

// }
