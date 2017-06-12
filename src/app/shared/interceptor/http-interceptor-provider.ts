import { FactoryProvider } from '@angular/core';
import { RequestOptions, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';
import { HttpInterceptor } from './HttpInterceptor';
import { UserService } from '../user.service';
import { SessionStorageService } from '../session-storage.service';

/**
 * Created by John Zhang on 16/11/15.
 */
export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions,
                                   _sessionStorageService: SessionStorageService,
                                   userService: UserService, router: Router) {
  return new HttpInterceptor(xhrBackend, requestOptions, _sessionStorageService, userService, router);
}

export function provideHttpInterceptor(): FactoryProvider {

  return {
    provide: HttpInterceptor,
    useFactory: interceptorFactory,
    deps: [XHRBackend, RequestOptions, SessionStorageService, UserService, Router]
  };
}
