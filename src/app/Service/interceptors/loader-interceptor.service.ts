import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, retry } from 'rxjs/operators';

import { LoaderService } from '../loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor  implements HttpInterceptor{
  private requests: HttpRequest<any>[] = [];
  private totalRequests = 0;
  constructor(private loaderService: LoaderService) { }


  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    const onlyTextResponse = httpRequest.headers.getAll('Interceptor');
    this.loaderService.setLoading(true);
    const token = sessionStorage && sessionStorage.length > 0 ? sessionStorage.getItem('userToken') : '';
    const headers = token ? {'tokenid' : token} : {
      // 'Content-type': 'text/plain',
      // 'tokenid': token
      // 'tokenid' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NDI1ODYxOTEsImV4cCI6MTY3NDEyMjE5MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsInVzZXJOYW1lIjoiYW1yaXQucmFqMUBmYWQuY29tIiwidXNlcklkIjoicmFqMWFtIn0.AC-zOIRZyyRG1j1OxdPeLuSZR1iwSVvTA2MuYWHRYeo'
    }
    return next.handle(httpRequest.clone({setHeaders: headers}))
    .pipe(finalize(() => {
      this.totalRequests--;
      if (this.totalRequests === 0) {
        this.loaderService.setLoading(false)
      }
      setTimeout(() => {
        this.loaderService.setLoading(false)
      }, 5000);
    }),
      map(val=>{
        //console.clear();
        //console.log("requst is ",val)
      return val;
    }),
    catchError((err)=>{
      //console.log(err);
      if(onlyTextResponse && onlyTextResponse[0] === 'false'){
        return throwError(err)
      }
      this.loaderService.setLoading(false);
      this.loaderService.isError.next({message: err.message, status: err.status})
      return throwError(err)

    })
    )}

  // removeRequest(req: HttpRequest<any>) {
  //   const i = this.requests.indexOf(req);
  //   if (i >= 0) {
  //     this.requests.splice(i, 1);
  //   }
  //   this.loaderService.isLoading.next(this.requests.length > 0);
  // }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   this.requests.push(req);

  //   console.log("No of requests--->" + this.requests.length);

  //   this.loaderService.isLoading.next(true);
  //   return new Observable(observer => {
  //     const subscription = next.handle(req).pipe(
  //       catchError(err=>{
  //         //console.log('1----------',err);
  //         this.loaderService.isError.next({message: err.message, status: err.status})
  //         return throwError(err)
  //       })
  //     ).subscribe(
  //         event => {
  //           if (event instanceof HttpResponse) {
  //             this.removeRequest(req);
  //             observer.next(event);
  //           }
  //         },
  //         err => {
  //           //alert('error' + JSON.stringify(err));
  //           this.removeRequest(req);

  //           observer.error(err);
  //           throwError(err);
  //         },
  //         () => {
  //           this.removeRequest(req);
  //           observer.complete();
  //         });
  //     // remove request from queue when cancelled
  //     return () => {
  //       this.removeRequest(req);
  //       subscription.unsubscribe();
  //     };
  //   });
  // }
}
