import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FileRestrictions, RemoveEvent, SelectEvent } from '@progress/kendo-angular-upload';
import * as moment from 'moment';
import { AppConfig } from '../Service/app-config.service';
import { orderBy, process, SortDescriptor } from "@progress/kendo-data-query";
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { LoginService } from '../Service/LogIn/login.service';
import { InvoiceService } from '../Service/online-engine.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  headerStyle = {
    'background-color': '#004d94',
    color: '#fff',
    'font-size': '12px',
    'padding-left':'5px'
  };
  data = [];
  public sheetDataToUpload: any;
  disableFileSubmit: boolean = false;
  gridData = [];
  openInner = false;
  successRefId = '';
  uploadExcelFile = false;

  public gridView: any;
  public pageSize = 10;
  public skip = 0;
  public gridHeight = 600;
  // Grid Data

  sort: SortDescriptor[] = [];
  resDialog = false;
  seletedTitle: any;
  seletedResult: any = null;
  errorMessage: any[] = [];
  failedUploadMsg: any = null;
  errorFields = [];
  openFailed = false;
  isFieldError = false;
  selectedError: any;
  excelFilename: any;

  minDate = new Date();
  maxDate = new Date();


  message: any;
  loading: boolean = false
  selectedTab: number = 0;

  openAlertDialog: boolean = false;
  successMsg: string = '';
  successTitle: string = '';
  errorList = [];
  errorMap:any = null;
  objectKeys = Object.keys;

  constructor(private router: Router, private _invoiceService: InvoiceService, private loginobj: LoginService) { }

  allData: any = []
  openedDialog: boolean = false;
  inputDataObj: any;
  title: any;
  stateName: any = []

  filterForm: FormGroup = new FormGroup({
    fromDate: new FormControl(new Date()),
    toDate: new FormControl(new Date()),
    referenceId: new FormControl(''),
  });
  
 year= new Date().getFullYear();

  currentUserName: any = null;
  loggedInUserDetails: any = null;

  ngOnInit(): void {
    this.minDate = new Date(this.minDate.setFullYear(this.minDate.getFullYear() - 85));
    this.maxDate = new Date(this.maxDate.setFullYear(this.maxDate.getFullYear() + 15));
    this.getUserDetails();
  }

  getUserDetails(){
    this.loggedInUserDetails = sessionStorage.getItem('userDetails');
    //console.log('user details', this.loggedInUserDetails)
    if(this.loggedInUserDetails){
      let changesData = JSON.parse(this.loggedInUserDetails)
      this.currentUserName = `${changesData['firstName']} ${changesData['lastName']}`
    } else {
      this.router.navigateByUrl('');
    }
  }

  getValueLoop(item: any) {
    return item
  }
  
  DateConvertor(oldDateFormat: any) {
    let newDate = new Date(oldDateFormat)
    const date = newDate.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })
    return date;
  }

  checkValueObj(obj: any, key: any) {
    if (typeof (obj) === 'string' && obj.includes('{')) {
      obj = JSON.parse(obj)
      return obj
    }
    else {
      if (key === "Start Time" || key === "End Time") {
        return this.DateConvertor(obj)
      } else {
        return obj
      }
    }
  }

  openInnerDialog(data: any, title: any) {
    this.title = title
    this.inputDataObj = JSON.parse(data)
    this.openInner = true;
  }

  onFilterSubmit() {
    this.loading = true;
    const finalObj = {
      fromDate: formatDate(this.filterForm.value.fromDate, 'yyyy-MM-dd', 'en'),
      toDate: formatDate(this.filterForm.value.toDate, 'yyyy-MM-dd', 'en'),
      referenceId: this.filterForm.value.referenceId
    };
    this._invoiceService.getDataByReferenceId(finalObj).subscribe({
      next: (res: any) => {
        console.log(res);
          this.skip = 0;
          if(res?.success && res?.response){

            this.gridData = res.response;

          } else {
            this.successTitle = 'Alert';
            this.successMsg = res.successMsg;
            this.openAlertDialog = true;
            this.gridData = [];
          }   
          this.loadItems();      
      },
      error: (err: any) =>  {
        console.log(err?.error.response.Error);
        const error = err?.error.response.Error;
        this.errorMessage = Object.keys(error).map((el) => {
          return {
            header: el,
            errors: error[el],
          };
        });
      },
      complete: () => {
        console.info('complete');
        this.loading = false;
      }
    });


  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadItems();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.gridView = {
      data: orderBy(this.gridData?.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.gridData.length,
    };
  }

  resetFilterForm() {
    this.filterForm.reset();
  }

  showResponseDialog(data:any) {
    if(data){
      this.seletedResult = data; //JSON.parse(data);
      this.seletedTitle = `Reference Id: ${this.seletedResult?.referenceId}`
      this.resDialog = true;
    }  
  }

  close() {
    this.openInner = false;
    this.successRefId = '';
    this.resDialog = false;
    this.seletedResult = null;
    this.errorMessage = [];
    this.openFailed=false;
    this.selectedError = null;
  }

  closeInnerDialog(){
    this.openInner = false;
  }

  closeAlertDialog(status: any) {
    if (status === 'yes') {
      this.openAlertDialog = false;
    } else {
      this.openAlertDialog = false;
    }
  }

  onTabSelect(e: any) {
    this.selectedTab = e.index;
  }

  excelHeader = ['position', 'name', 'class'];

  onlogout(){
    sessionStorage.removeItem('UserInfo');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userDetails');
    this.router.navigateByUrl('');
  }

}
