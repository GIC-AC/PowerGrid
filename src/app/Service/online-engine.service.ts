import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { AppConfig } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class OnlineEngineService {
  onlineEngineSingleSearchUrl: string = '';
  onlineEngineUrl: string = '';

  constructor(private http: HttpClient, public config: AppConfig) {
    this.onlineEngineSingleSearchUrl = config.onlineEngineSingleSearchUrl;
    this.onlineEngineUrl = config.onlineEngineUrl;
  }  

  getDataByFormSearch(obj:any) : Observable<any>{
    return this.http.post<any>(`${this.onlineEngineSingleSearchUrl}onlineapi`,obj)
    //return this.http.post<any>(`${this.onlineEngineSingleSearchUrl}onlineapi`, obj,{headers:new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`)});
  }

  uploadExcel(obj:any) : Observable<any>{
    return this.http.post<any>(`${this.onlineEngineUrl}online-bulk-upload`,obj)
    //return this.http.post<any>(`${this.onlineEngineUrl}upload`, obj,{headers:new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`)});
  }
 
  getDataByReferenceId(obj: any) : Observable<any>{
    // return of({
    //   "success": true,
    //   "code": "SUCCESS_CODE_200",
    //   "successMsg": "Excel request retrieved successfully",
    //   "response": [
    //     {
    //       "id": 1,
    //       "referenceId": "35627360",
    //       "requestId": "354419154491",
    //       "requestJson": "{\"DIN\": \"06726814\", \"DOB\": \"21-02-1989\", \"Name\": \"Madhav Rai Prasad\", \"State\": \"JHARKHAND\", \"Address\": \"Ranchi\", \"Start Date\": \"22-06-2007\", \"Father Name\": \"Mr. XYZ\"}",
    //       "responseJson": "{\"MCA\": {\"status\": \"Manual\", \"End Time\": \"2022-07-18T06:37:24.340\", \"MCA Input\": \"{\\\"name\\\":\\\"Madhav Rai Prasad\\\",\\\"dob\\\":\\\"21-02-1989\\\",\\\"services\\\":\\\"mca_dir_combo\\\"}\", \"verify_id\": \"62d537d483ca403aa7d62dc0\", \"MCA Output\": \"Send Cross directorship check for Manual review as Record found with only Name match (Contains)\", \"Start Time\": \"2022-07-18T06:37:08.224\", \"Time Taken\": 16}, \"WatchOut\": {\"status\": \"Clear\", \"End Time\": \"2022-07-18T06:37:26.682\", \"Start Time\": \"2022-07-18T06:37:24.340\", \"Time Taken\": 2, \"WatchOut Input\": \"{\\\"firstname\\\":\\\"Madhav\\\",\\\"lastname\\\":\\\"Prasad\\\",\\\"middlename\\\":\\\"Rai\\\"}\", \"WatchOut Output\": \"Auto Tag Disqualified directorship as clear \"}, \"Manupatra\": {\"status\": \"Clear\", \"End Time\": \"2022-07-18T06:37:09.479\", \"Start Time\": \"2022-07-18T06:37:08.225\", \"Time Taken\": 1, \"ManuPatra Input\": \"{\\\"formattedName\\\":\\\"Madhav Rai Prasad\\\"}\", \"ManuPatra Output\": \"Auto Tag Civil Litigation as clear.Data field of Raw Data is Empty\"}, \"WorldCheck\": {\"caseId\": \"\", \"status\": \"\", \"End Time\": \"2022-07-18T06:37:08.370\", \"Start Time\": \"2022-07-18T06:37:08.225\", \"Time Taken\": 0, \"World Check Input\": \"{\\\"name\\\":\\\"Madhav Rai Prasad\\\",\\\"dob\\\":\\\"21-02-1989\\\",\\\"father_name\\\":\\\"Mr. XYZ\\\"}\", \"World Check Output\": \"\"}, \"Adverse Media\": {\"status\": \"Clear\", \"End Time\": \"2022-07-18T06:37:24.347\", \"verify_id\": \"62d537d483ca403aa7d62dc1\", \"Start Time\": \"2022-07-18T06:37:08.225\", \"Time Taken\": 16, \"Adverse media Input\": \"{\\\"name\\\":\\\"Madhav Rai Prasad\\\",\\\"dob\\\":\\\"21-02-1989\\\",\\\"contexts\\\":\\\"\\\",\\\"services\\\":\\\"adverse_media\\\"}\", \"Adverse Media Output\": \"Auto Tag Web & Media. Data is Empty\"}, \"Loan Defaulter\": {\"status\": \"Clear\", \"End Time\": \"2022-07-18T06:37:24.356\", \"verify_id\": \"62d537d483ca403aa7d62dbf\", \"Start Time\": \"2022-07-18T06:37:08.224\", \"Time Taken\": 16, \"Loan Defaulter Input\": \"{\\\"name\\\":\\\"Madhav Rai Prasad\\\",\\\"services\\\":\\\"credit_reputational_cibil\\\"}\", \"Loan Defaulter Output\": \"Data is Empty.Auto Tag Loan Defaulter as Clear\"}}",
    //       "uploadedDateTime": "2022-07-18T10:37:06.519+00:00",
    //       "requestTime": "2022-07-18T10:37:07.006+00:00",
    //       "responseTime": "2022-07-18T10:37:26.730+00:00",
    //       "sentToOnlineEngine": true,
    //       "onlineEngineStatus": true
    //     }
    //   ]
    // })
    return this.http.post<any>(`${this.onlineEngineUrl}request-search`, obj,{headers:new HttpHeaders().set('Authorization',`Bearer ${sessionStorage.getItem("userToken")}`)});
  }


}
