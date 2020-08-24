import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginAttempt } from './loginAttempts.model';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginAttemptsService {

  private apiServer = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient){}

  get(): Observable<ILoginAttempt[]> {
    return this.http.get<ILoginAttempt[]>(this.apiServer + '/loginAttempts')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  create(userId: number) {
    const loginAttempt: ILoginAttempt = {
      id: 0,
      userId : userId,
      count : 0
    };
    console.log('Saving LoginAttempts: ' + JSON.stringify(loginAttempt));
    this.http.post<ILoginAttempt>(this.apiServer + '/loginAttempts', JSON.stringify(loginAttempt), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    ).subscribe(response => response );
  }

  update(id: number, loginAttempt: ILoginAttempt) {
    console.log('Updating LoginAttempts: ' + JSON.stringify(loginAttempt));
    return this.http.put<ILoginAttempt>(this.apiServer + '/loginAttempts/' + id, JSON.stringify(loginAttempt), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    ).subscribe(response => response );
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
