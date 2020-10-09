import { IWorkItem } from './work-item.model';
import { LoginService } from '../login/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkService } from './work.service';
import { IUser } from '../user/user.model';

@Component({
  selector: 'app-user-worksheet',
  templateUrl: './user-worksheet.component.html',
  styleUrls: ['./user-worksheet-list.component.css']
})
export class UserWorkSheetComponent implements OnInit {

  userWorkSheetForm: FormGroup;
  user: IUser;
  workItems: IWorkItem[] = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public workService: WorkService,
    public loginService: LoginService
  ){ }

  ngOnInit() {
    this.userWorkSheetForm = this.fb.group({
      id: 0,
      userId: '',
      userName: '',
      workWeek: Date,
      workItemCodes: [''],
      workHours: '',
      status: '',
  });

    this.user = this.loginService.currentUser;
    this.workService.getAllWorkItems().subscribe((workItems) => {
      this.workService.getAllAssignWorks().subscribe((response) => {
        response.forEach(assignWork => {
          if (assignWork.userId === this.user.id) {
            assignWork.workItemCodes.forEach( (workItemCode) => {
              this.workItems.push(workItems.find( workItem => workItemCode === workItem.code ));
            });
          }
        });
      });
    });
  }

  save() {
    this.workService.createUserWorkSheet(this.userWorkSheetForm.value, this.user).subscribe( res => {
      alert('User WorkSheet Submitted');
      this.router.navigateByUrl('home');
    });
  }

}
