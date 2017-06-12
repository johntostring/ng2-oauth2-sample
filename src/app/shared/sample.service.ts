import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor } from './interceptor/HttpInterceptor';


@Injectable()
export class SampleService {

  constructor (private http: HttpInterceptor,
               @Inject('appConfig') private _config: any) {

  }

  getBooks() {
    return this.http.get(this._config.resServer + '/books').map(r => r.json());
  }
}
