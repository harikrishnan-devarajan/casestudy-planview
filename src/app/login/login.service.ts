import { Injectable } from '@angular/core';

import { User } from './../user/user';
import { MessageService } from '../messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: User;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor(private messageService: MessageService) { }

  login(userName: string, password: string): void {
    if (!userName || !password) {
      this.messageService.addMessage('Please enter your userName and password');
      return;
    }
    if (userName === 'admin') {
      this.messageService.addMessage('Admin login');
      return;
    }
    this.messageService.addMessage(`User: ${this.currentUser.username} logged in`);
  }

  logout(): void {
    this.currentUser = null;
  }
}
