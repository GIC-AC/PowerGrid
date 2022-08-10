import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { OnlineEngineService } from 'src/app/Service/online-engine.service';


@Component({
  selector: 'app-single-form',
  templateUrl: './single-form.component.html',
  styleUrls: ['./single-form.component.css']
})
export class SingleFormComponent implements OnInit {
  message: any;
  loading:boolean=false

  constructor(private _onlineEngineService: OnlineEngineService) { }
  allData: any = []
  public opened = false;
  openedDialog: boolean = false;
  inputDataObj: any;
  title: any;
  stateName: any = []

  searchForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    din: new FormControl(),
    dob: new FormControl('', Validators.required),
    contexts: new FormControl(),
    address: new FormControl(),
    father_name: new FormControl(),
    state: new FormControl(),
    startdate: new FormControl(null)
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

  age18Check(birthday: any) {
    console.log(birthday)
    let data = moment(birthday).add(18, 'years') <= moment();
    if (data === false) {
      this.openedDialog = true;
      this.searchForm.patchValue({
        dob: ''
      })
      this.message = "Age Should Be 18+"
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

  onSearch() {
    this.loading=true;
    let check = formatDate(this.searchForm.value.startdate, 'dd.MM.yyyy', 'en')
    if(check === "01.01.1970"){
      this.searchForm.value.startdate= ""
    }
    else{
      this.searchForm.value.startdate= formatDate(this.searchForm.value.startdate, 'dd.MM.yyyy', 'en')
    }
    let obj = {
      name: this.searchForm.value.name,
      din: this.searchForm.value.din,
      dob: formatDate(this.searchForm.value.dob, 'dd-MM-yyyy', 'en'),
      contexts: this.searchForm.value.contexts,
      address: this.searchForm.value.address,
      father_name: this.searchForm.value.father_name,
      state: this.searchForm.value.state,
      startdate:this.searchForm.value.startdate
    }
    this._onlineEngineService.getDataByFormSearch(obj).subscribe({
      next: (res) => {
        console.log(res);
        this.allData = res.response
        if (res.response === 0) {
          this.openedDialog = true;
          this.message = "No Data Found"
        }
        console.log(this.allData)
        this.searchForm.reset();
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
