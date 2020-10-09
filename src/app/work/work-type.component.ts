import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkService } from './work.service';

@Component({
  selector: 'app-work-type',
  templateUrl: './work-type.component.html'
})
export class WorkTypeComponent implements OnInit {

  pageTitle = 'Create WorkType';
  workTypeForm: FormGroup;

  ngOnInit() {
    this.workTypeForm = this.fb.group({
    code: '',
    description: ''
  });
}

constructor(
  public fb: FormBuilder,
  private router: Router,
  public workService: WorkService
){ }

save() {
  this.workService.createWorkType(this.workTypeForm.value).subscribe(res => {
    this.router.navigateByUrl('/workitem');
  });
}

}
