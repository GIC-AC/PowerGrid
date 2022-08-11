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
    return of({
      success: true,

      successMsg: 'Response Received successfully',

      successCode: 'SUCCESS_CODE_200',

      response: [
        {
          referenceId: '150592192112',

          responseJson:
            '{"referenceId": "AXP349F70UIK", "DocumentData": {"Date": "", "VendorName": "", "BillingName": "", "TotalAmount": "", "InvoiceNumber": ""}, "ApplicationData": {"Date": "", "VendorName": "", "BillingName": "", "TotalAmount": "", "InvoiceNumber": ""}, "requstProcessorId": 6, "DocumentMatchedData": {"Date": true, "VendorName": true, "BillingName": false, "TotalAmount": true, "InvoiceNumber": true}}',

          status: 'success',

          requestTimestamp: '2022-08-08T09:34:46.138+00:00',

          responseTimestamp: '2022-08-08T11:18:48.367+00:00',
        },
      ],
    });
    return this.http.post<any>(`${this.invoiceUrl}get/filter`, obj);
  }
}
