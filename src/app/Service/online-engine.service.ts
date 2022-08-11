import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { AppConfig } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  invoiceUrl: string = '';

  constructor(private http: HttpClient, public config: AppConfig) {
    this.invoiceUrl = config.invoiceUrl;
  }

  uploadInvoice(obj:any) : Observable<any>{
    return this.http.post<any>(`${this.invoiceUrl}submit`,obj)
  }

  getDataByReferenceId(referenceId: any) : Observable<any>{
    return of({
      success: true,
      successMsg: 'Response Received successfully',
      successCode: 'SUCCESS_CODE_200',
      response: [
        {
          referenceId: 'AXP349F70UIK',
          DocumentData: {
            Date: '2022-03-05',
            VendorName: 'Axel',
            BillingName: 'Ajay Saho',
            TotalAmount: '300.00',
            InvoiceNumber: 'ABCD1234',
          },
          ApplicationData: {
            Date: '2022-03-05',
            VendorName: 'Axel',
            BillingName: 'Ajay Saho',
            TotalAmount: '300.00',
            InvoiceNumber: 'ABCD1234',
          },
          'Document Matched Data': {
            Date: true,
            VendorName: true,
            BillingName: false,
            TotalAmount: true,
            InvoiceNumber: true,
          },
        },
      ],
    });
   return this.http.get<any>(`${this.invoiceUrl}get/${referenceId}`);
  }


}
