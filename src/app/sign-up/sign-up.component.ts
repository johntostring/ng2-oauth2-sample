import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { SessionStorageService } from '../shared/session-storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public userForm: any = {};
  public valid = false;
  public validMessage;

  constructor(private router: Router,
              private _userService: UserService,
              private _sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this.resetUserForm();
  }

  private resetUserForm () {
    this.userForm = {
      username: '',
      password: '',
      passwordConfirm: ''
    };
  }

  register() {
    if (this.userForm.password !== this.userForm.passwordConfirm) {
      this.validMessage = '两次密码输入不一致';
      return;
    }
    this._userService.register({
      username: this.userForm.username,
      password: this.userForm.password,
    }).subscribe({
      next: value => {
        this.resetUserForm();
        this.validMessage = null;
        alert('注册成功');
      },
      error: err => {
        const res = err.json();
        if (res.error) {
          this.validMessage = res.error;
        } else {
          this.validMessage = null;
        }
      }
    });
  }
}
