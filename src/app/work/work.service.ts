import { IUserWorkSheet } from './user-worksheet.model';
import { IAssignWork } from './assign-work.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IWorkItem } from './work-item.model';
import { IWorkType } from './work-type.model';
import { Injectable } from '@angular/core';
import { IUser } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private apiServer = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient){}

  createWorkType(workType: IWorkType) {
    console.log('Saving WorkType: ' + JSON.stringify(workType));
    return this.http.post<IWorkType>(this.apiServer + '/worktype', JSON.stringify(workType), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAllWorkTypes() {
    console.log('Fetching All Work Types');
    return this.http.get<IWorkType[]>(this.apiServer + '/worktype')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  createWorkItem(workItem: IWorkItem) {
    console.log('Saving Workitem: ' + JSON.stringify(workItem));
    return this.http.post<IWorkItem>(this.apiServer + '/workitem', JSON.stringify(workItem), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAllWorkItems() {
    console.log('Fetching All Work Items');
    return this.http.get<IWorkItem[]>(this.apiServer + '/workitem')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  handleAssignWork(assignWork: IAssignWork) {
    let result: IAssignWork;
    assignWork.userId = Number(assignWork.userId);
    const codesArray = [assignWork.workItemCodes.toString()];
    assignWork.workItemCodes = codesArray;
    this.getAllAssignWorks().subscribe((response) => {
      if (response !== null && response !== undefined && response.length > 0) {
        response.forEach(data => {
          if (data.userId === assignWork.userId) {
            this.updateAssignWork(data.id, assignWork).subscribe((createResponse) => {
              result = createResponse;
            });
          } else {
            this.createAssignWork(assignWork).subscribe((createResponse) => {
              result = createResponse;
            });
          }
        });
      } else {
        this.createAssignWork(assignWork).subscribe((createResponse) => {
          result = createResponse;
        });
      }
    });
    return result;
  }

  createAssignWork(assignWork: IAssignWork) {
    console.log('Saving AssignWork: ' + JSON.stringify(assignWork));
    return this.http.post<IAssignWork>(this.apiServer + '/assignwork', JSON.stringify(assignWork), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAllAssignWorks() {
    console.log('Fetching All User Assign Works');
    return this.http.get<IAssignWork[]>(this.apiServer + '/assignwork/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  updateAssignWork(id: number, assignWork: IAssignWork) {
    assignWork.id = id;
    console.log('Updating AssignWork: ' + JSON.stringify(assignWork));
    return this.http.put<IAssignWork>(this.apiServer + '/assignwork/' + id, JSON.stringify(assignWork), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  createUserWorkSheet(userWorkSheet: IUserWorkSheet, user: IUser) {
    userWorkSheet.userId = user.id;
    userWorkSheet.userName = user.userName;
    userWorkSheet.status = 'Submitted';
    const codesArray = [userWorkSheet.workItemCodes.toString()];
    userWorkSheet.workItemCodes = codesArray;
    console.log('Saving UserWorkSheet: ' + JSON.stringify(userWorkSheet));
    return this.http.post<IUserWorkSheet>(this.apiServer + '/userworksheet', JSON.stringify(userWorkSheet), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAllUserWorkSheets(): Observable<IUserWorkSheet[]> {
    console.log('Fetching User WorkSheets');
    return this.http.get<IUserWorkSheet[]>(this.apiServer + '/userworksheet/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getUserWorkSheet(userWorkSheetId: number) {
    console.log('Fetching User WorkSheet Details: ', userWorkSheetId);
    return this.http.get<IUserWorkSheet>(this.apiServer + '/userworksheet/' + userWorkSheetId)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  updateUserWorkSheet(userWorkSheetId: number) {
    this.getUserWorkSheet(userWorkSheetId).subscribe((worksheet) => {
      worksheet.status = 'Approved';
      console.log('Updating UserWorkSheet: ' + JSON.stringify(worksheet));
      return this.http.put<IUserWorkSheet>(this.apiServer + '/userworksheet/' + userWorkSheetId,
      JSON.stringify(worksheet), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      ).subscribe(() => {});
    });
  }

  getSubmittedUserWorkSheets(): IUserWorkSheet[] {
    const submittedWorkSheets: IUserWorkSheet[] = [];
    this.getAllUserWorkSheets().subscribe((data) => {
      data.forEach((worksheet) => {
        if (worksheet.status === 'Submitted')
        {
          submittedWorkSheets.push(worksheet);
        }
      });
    });
    return submittedWorkSheets;
  }

  private errorHandler(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
