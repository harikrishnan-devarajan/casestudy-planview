import { IUser } from './user.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServer = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  users: IUser[];

  constructor(private http: HttpClient){}

  get(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiServer + '/users')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  create(user: IUser) {
    console.log('Saving User: ' + JSON.stringify(user));
    return this.http.post<IUser>(this.apiServer + '/users', JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getByID(id: number) {
    console.log('Fetching User Details: ', id);
    return this.http.get<IUser>(this.apiServer + '/users/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id: number, user: IUser) {
    console.log('Updating User: ' + JSON.stringify(user));
    return this.http.put<IUser>(this.apiServer + '/users/' + id, JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    ).subscribe(response => response );
  }

  delete(id: number): Observable<IUser> {
    console.log('Deleting User: ', id);
    return this.http.delete<IUser>(this.apiServer + '/users/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  unblockUser(id: number, user: IUser) {
    console.log('Unblocking User: ', id);
    user.blocked = false;
    return this.http.put<IUser>(this.apiServer + '/users/' + id, JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
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
