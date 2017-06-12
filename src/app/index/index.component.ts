import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { SampleService } from '../shared/sample.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public books: any[];

  constructor(private _router: Router,
              private _userService: UserService,
              private _sampleService: SampleService) {

  }

  ngOnInit() {
    this._sampleService.getBooks()
      .subscribe({
        next: books => {
          this.books = books;
        }
      });
  }

  logout() {
    const flag: boolean = confirm('确认要注销？');

    if (flag && this._userService.logout()) {
      this._router.navigate(['/login']);
    }
  }
}
