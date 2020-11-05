import { UserService } from './../user/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkService } from './work.service';
import { IWorkItem } from './work-item.model';
import { IUser } from '../user/user.model';

@Component({
  selector: 'app-assign-work',
  templateUrl: './assign-work.component.html'
})
export class AssignWorkComponent implements OnInit {

  pageTitle = 'Assign WorkItems To Users';
  assignWorkForm: FormGroup;
  workItems: IWorkItem[];
  users: IUser[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private workService: WorkService,
    private userService: UserService
  ){ }

  ngOnInit() {
    this.assignWorkForm = this.fb.group({
    id: 0,
    userId: 0,
    workItemCodes: ['']
  });

    this.workService.getAllWorkItems().subscribe((data) => {
      this.workItems = data;
    });
    this.userService.get().subscribe((data) => {
      this.users = data;
    });
  }

save() {
  const response = this.workService.handleAssignWork(this.assignWorkForm.value);
  if ( response !== null && response !== undefined) {
    alert('User AssignWork Completed');
    this.router.navigateByUrl('userworksheets');
  }
}

}
