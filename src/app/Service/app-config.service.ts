import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  apiUrl: string = '';
  userMgtApiUrl: string = '';
  onlineEngineUrl: string = '';
  onlineEngineSingleSearchUrl: string = '';
  constructor(private httpClient: HttpClient) {}

  ensureInit(): Promise<any> {
    return new Promise((r, e) => {
      this.httpClient.get('assets/config.development.json').subscribe(
        (content) => {
          Object.assign(this, content);
          console.log(this);
          r(this);
        },
        (reason) => e(reason)
      );
    });
  }

}
