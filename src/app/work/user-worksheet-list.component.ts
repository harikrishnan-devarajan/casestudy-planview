import { IUserWorkSheet } from './user-worksheet.model';
import { Router } from '@angular/router';
import { WorkService } from './work.service';
import { Component, OnInit } from '@angular/core';
import { IWorkItem } from './work-item.model';

@Component({
  selector: 'app-user-worksheet-list',
  templateUrl: './user-worksheet-list.component.html',
  styleUrls: ['./user-worksheet-list.component.css']
})
export class UserWorkSheetListComponent implements OnInit {

  userWorkSheets: IUserWorkSheet[];
  workItems: IWorkItem[];

  constructor(
    private router: Router,
    public workService: WorkService
  ){ }

  ngOnInit(): void {
    this.userWorkSheets = this.workService.getSubmittedUserWorkSheets();
    this.workService.getAllWorkItems().subscribe((data) => { this.workItems = data; });
  }

  approove(userWorkSheetId: number) {
    this.workService.updateUserWorkSheet(userWorkSheetId);
    this.router.navigateByUrl('home');
  }

}
