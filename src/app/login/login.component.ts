import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FetcherService } from '../core/fetcher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalid: boolean;

  login = new FormControl('', [Validators.required]);
  pass = new FormControl('', [Validators.required]);

  constructor(
    private $fetcher: FetcherService,
    private $router: Router
  ) { }

  ngOnInit() {
  }

  tryLogin() {
    this.invalid = false;
    this.$fetcher.tryLogin(this.login.value, this.pass.value).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.$router.navigate(['/']);
      } else {
        this.invalid = true;
      }
    });
  }
}
