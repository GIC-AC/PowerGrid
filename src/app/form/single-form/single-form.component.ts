import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { InvoiceService } from 'src/app/Service/online-engine.service';


@Component({
  selector: 'app-single-form',
  templateUrl: './single-form.component.html',
  styleUrls: ['./single-form.component.css']
})
export class SingleFormComponent implements OnInit {
  message: any;
  loading:boolean=false

  constructor(private _invoiceService: InvoiceService) { }
  allData: any = []
  public opened = false;
  openedDialog: boolean = false;
  inputDataObj: any;
  title: any;
  stateName: any = []

  invoiceForm: FormGroup = new FormGroup({
    VendorName: new FormControl('', Validators.required),
    BillingName: new FormControl('', Validators.required),
    Date: new FormControl(null, Validators.required),
    InvoiceNumber: new FormControl('', Validators.required),
    TotalAmount: new FormControl('', Validators.required),
    base64Code: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  getValueLoop(item: any) {
    return item
  }

  checkValueObj(obj: any) {

    if (typeof (obj) === 'string' && obj.includes('{')) {
      obj = JSON.parse(obj)
      return obj
    }
    else {
      return obj
    }
  }

  public close(status: string): void {
    this.opened = false;
    this.openedDialog = false
  }

  openDialog(data: any, title: any) {
    this.title = title
    this.inputDataObj = JSON.parse(data)
    this.opened = true;
  }

  onSubmit() {
    let obj = {
      "ApplicationData": {
        VendorName: this.invoiceForm.value.VendorName,
        BillingName: this.invoiceForm.value.BillingName,
        Date: formatDate(this.invoiceForm.value.Date, 'yyyy-MM-dd', 'en'),
        InvoiceNumber: this.invoiceForm.value.InvoiceNumber,
        TotalAmount: this.invoiceForm.value.TotalAmount
      },
      "base64Code": this.invoiceForm.value.base64Code
    }
    this._invoiceService.uploadInvoice(obj).subscribe({
      next: (res) => {
        console.log(res);
        if (res.response) {
          this.openedDialog = true;
          this.message = res.successMsg + ', \nReference ID: '+ res.response
        }
        this.invoiceForm.reset();
      },
      error: (err) =>  {
        console.log(err?.error);

      },
      complete: () => {
        console.info('complete');
        this.loading = false;
      }
    });
  }


}
