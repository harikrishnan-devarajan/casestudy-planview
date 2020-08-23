import { LoginAttemptsService } from './../login/loginAttempts.service';
import { LoginService } from './../login/login.service';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from './user.model';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit
{
  userFormGroup: FormGroup = new FormGroup({});
  passwordGroup: FormGroup = new FormGroup({});
  passwordMessage: string;
  admin = false;
  maxDate = maximumDate();

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private loginService: LoginService,
              private loginAttemptsService: LoginAttemptsService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: [''],
      email: ['', [Validators.required, Validators.email]],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      country: [''],
      zipcode: [''],
      userName: ['', [Validators.required, Validators.minLength(4)]],
      admin: [''],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: [''],
      }, { validator: passwordMatcher }),
    });
  }

  save(): void {
    console.log(this.userFormGroup.errors);
    const password = this.userFormGroup.value.passwordGroup.password;

    //since it is only used for validation deleting out whole passwordGroup
    delete this.userFormGroup.value.passwordGroup;

    const user = this.userFormGroup.value;
    user.password = password;
    user.blocked = false;
    if (this.userFormGroup.value.admin === '')
    {
      user.admin = false;
    }
    this.userService.create(user).subscribe(response => {
      const savedUser = response as IUser;
      this.loginService.currentUser = savedUser;
      this.loginService.isAdmin = savedUser.admin;
      this.loginAttemptsService.create(savedUser.id);

      this.messageService.addMessage(`User: ${user.userName} logged in`);

      this.userService.get().subscribe((data) => {
        this.loginService.users = data;
        this.router.navigateByUrl('/home');
      });
    });
  }

}

function maximumDate(): string {
  const year = new Date().getFullYear();
  const month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  const day = ('0' + new Date().getDate()).slice(-2);
  return (year + '-' + month + '-' + day);
}

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('confirmPassword');
  if (passwordControl.value === confirmControl.value) {
    return null;
  }

  return { match: true };
}
