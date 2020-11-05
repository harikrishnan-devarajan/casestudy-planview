import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from './user.model';

@Component({
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit
{
  userFormGroup: FormGroup = new FormGroup({});
  passwordGroup: FormGroup = new FormGroup({});
  passwordMessage: string;
  admin = false;
  maxDate = maximumDate();
  updateUser: IUser;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id != null) {
      this.userService.getByID(id).toPromise().then((response) => {
        console.log('response for id', response);
        this.updateUser = response as IUser;
      }).catch((err) => {
        console.error(err);
      });
    }

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

  update(id: number, updateUser: IUser) {
    console.log('UpdatedUser: ', updateUser);
    return this.userService.update(id, updateUser);
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
