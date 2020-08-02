import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private loginService: LoginService,
              private router: Router) { }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.loginService.login(userName, password);

      // Navigate to the Product List page after log in.
      if (this.loginService.redirectUrl) {
        this.router.navigateByUrl(this.loginService.redirectUrl);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
