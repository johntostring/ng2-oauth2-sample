import { Inject, Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SessionStorageService } from './session-storage.service';

/**
 * Import interfaces that service depends on
 */

@Injectable()
export class UserService {

  constructor (private http: Http,
               private _sessionStorageService: SessionStorageService,
               @Inject('appConfig') private _config: any) {

  }

  login(user) {
    const req = new RequestOptions();
    req.search = new URLSearchParams();
    req.search.append('grant_type', 'password');
    req.search.append('scope', 'read');
    req.search.append('username', user.username);
    req.search.append('password', user.password);
    req.headers = new Headers();
    req.headers.append('Authorization', 'Basic c2FtcGxlLWNsaWVudDoxMjM0NTY=');
    return this.http.post(this._config.authServer + '/oauth/token', null, req)
              .map((res: Response) => res.json());
  }

  authenticated() {
    console.log('authenticated:', this._sessionStorageService.getAuth('isAuthenticated'));
    return true === this._sessionStorageService.getAuth('isAuthenticated');
  }

  logout() {
    this._sessionStorageService.clearAll();
    return true;
  }

  register(user) {
    const req = new RequestOptions();
    req.headers = new Headers();
    req.headers.append('Content-Type', 'application/json');
    req.headers.append('Authorization', 'Basic c2FtcGxlLWNsaWVudDoxMjM0NTY=');
    return this.http.post(this._config.authServer + '/user', user, req)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }



  private handleError (error: Response) {
    return Observable.throw(error || 'Server Error');
  }
}
