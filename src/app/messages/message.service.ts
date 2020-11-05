import { IMessage } from './message.model';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiServer = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private _messages: string[] = [];
  isDisplayed = false;

  constructor(private http: HttpClient){}

  get messages(): string[] {
    return this._messages;
  }

  clearMessages() {
    this._messages = [];
  }

  addMessage(message: string): void {
    const currentDate = new Date();
    this.messages.unshift(message + ' at ' + currentDate.toLocaleString());
  }

  createMessage(message: IMessage) {
    message.userId = Number(message.userId);
    console.log('Saving Message: ' + JSON.stringify(message));
    return this.http.post<IMessage>(this.apiServer + '/message', JSON.stringify(message), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAllMessages() {
    console.log('Fetching All Messages');
    return this.http.get<IMessage[]>(this.apiServer + '/message')
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
