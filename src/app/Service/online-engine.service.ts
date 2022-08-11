import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { AppConfig } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  invoiceUrl: string = '';

  constructor(private http: HttpClient, public config: AppConfig) {
    this.invoiceUrl = config.invoiceUrl;
  }

  uploadInvoice(obj: any): Observable<any> {
    return this.http.post<any>(`${this.invoiceUrl}submit`, obj);
  }

  getDataByReferenceId(obj: any): Observable<any> {
    return this.http.post<any>(`${this.invoiceUrl}get/filter`, obj);
  }
}
