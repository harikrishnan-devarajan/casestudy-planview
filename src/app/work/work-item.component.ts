import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkService } from './work.service';
import { IWorkType } from './work-type.model';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html'
})
export class WorkItemComponent implements OnInit {

  pageTitle = 'Create WorkItem';
  workItemForm: FormGroup;
  workTypes: IWorkType[];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public workService: WorkService
  ){ }

  ngOnInit() {
    this.workItemForm = this.fb.group({
    code: '',
    description: '',
    workTypeCode: ['']
  });

    this.workService.getAllWorkTypes().subscribe((data) => {
      this.workTypes = data;
    });
  }

  save() {
    this.workService.createWorkItem(this.workItemForm.value).subscribe(res => {
      this.router.navigateByUrl('assignwork');
    });
  }

}
