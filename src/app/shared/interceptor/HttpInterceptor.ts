import { Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { SessionStorageService } from '../session-storage.service';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Rx';

/**
 * <a href="https://angular.cn/docs/ts/latest/api/http/index/Http-class.html">How to use Http</a>
 * Example:
 * <pre>
 *   export class YourComponent implements OnInit {
 *
 *      constructor(private http: HttpInterceptor) {
 *
 *      }
 *
 *      ngOnInit() {
 *        this.http.get('http://localhost:8080/uaa/user').subscribe(
 *          (res) => console.log(res),
 *          (err) => console.error(err),
 *          () => console.log('Yay'));
 *      }
 *   }
 * </pre>
 */
export class HttpInterceptor extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,
              private _sessionStorageService: SessionStorageService,
              private _userService: UserService,
              private _router: Router) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, this.getRequestOptionArgs(options)));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.patch(url, body, this.getRequestOptionArgs(options)));
  }

  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    if (options.headers.get('Content-Type') == null) {
      options.headers.append('Content-Type', 'application/json');
    }
    const token = this._sessionStorageService.getAuth('access_token');
    options.headers.append('Accept', 'application/json');
    options.headers.append('Authorization', 'Bearer ' + token);
    options.withCredentials = false;
    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      if (err.status === 401) {
        console.log('error 401', this._router)
        this._userService.logout();
        this._router.navigateByUrl('/login');
        return Observable.empty();
      } else {
        console.log('Http error: ', err, source);
        return Observable.empty();
      }
    });

  }
}
