import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './shared/user.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(private _router: Router, private _userService: UserService) {}

  canActivate(): Observable<boolean> | boolean {
    if (this._userService.authenticated()) {
      return true;
    } else {
      this._router.navigateByUrl('/login');
      return false;
    }
  }
}
