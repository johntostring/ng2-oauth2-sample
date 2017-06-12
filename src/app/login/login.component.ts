import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { SessionStorageService } from '../shared/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any;

  constructor(private router: Router,
              private _userService: UserService,
              private _sessionStorage: SessionStorageService) {

  }

  ngOnInit() {
    this.user = {username: '', password: ''};
  }

  loginUser() {
    console.log(this.user);
    this._userService.login(this.user)
      .subscribe({
        next: token => {
          token.username = this.user.username;
          token.isAuthenticated = true;
          this._sessionStorage.setAuth(token);
          let redirectUrl = this._sessionStorage.getLastVisitUrl();
          if (!redirectUrl || '/login' === redirectUrl) {
            redirectUrl = '/index';
          }
          this._sessionStorage.removeLastVisitUrl();
          this.router.navigate([redirectUrl]);
        },
        error: err => {
          const res = err.json();
          if (res && res.error_description === 'Bad credentials') {
            alert('用户名或密码错误');
          } else {
            alert('登录失败');
          }
        }
      });
  }
}
