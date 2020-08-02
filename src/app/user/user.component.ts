import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit
{
  userFormGroup: FormGroup;
  passwordMessage: string;

  constructor(private formBuilder: FormBuilder)
  {

  }
  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
        confirmPassword: ['', Validators.required],
      }, { validator: passwordMatcher }),
    });
  }

  save(): void {
    console.log(this.userFormGroup);
    console.log('Saved: ' + JSON.stringify(this.userFormGroup.value));
  }
}

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('confirmPassword');

  if (passwordControl.value === confirmControl.value) {
    return null;
  }

  return { match: true };
}
