import { ILoginAttempt } from './loginAttempts.model';
import { LoginAttemptsService } from './loginAttempts.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { UserService } from './../user/user.service';
import { IUser } from '../user/user.model';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private loginService: LoginService,
              private userService: UserService,
              private router: Router,
              private loginAttemptsService: LoginAttemptsService) { }
  ngOnInit(): void {
    this.userService.get().subscribe((data: IUser[]) => {
      this.loginService.users = data;
    });
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const username = loginForm.value.username;
      const password = loginForm.value.password;
      this.loginAttemptsService.get().subscribe((data: ILoginAttempt[]) => {
        this.loginService.loginAttempts = data;

        const registeredUser = this.loginService.isRegisteredUser(username, password);
        const userBlockedFlag = this.loginService.userBlockedFlag;
        if (userBlockedFlag || registeredUser) {
          this.router.navigateByUrl('/home');
        } else {
          this.router.navigateByUrl('/user');
        }
      });

    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
