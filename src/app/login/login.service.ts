import { UserService } from './../user/user.service';
import { LoginAttemptsService } from './loginAttempts.service';
import { Injectable } from '@angular/core';

import { IUser } from '../user/user.model';
import { MessageService } from '../messages/message.service';
import { ILoginAttempt } from './loginAttempts.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: IUser;
  isAdmin = null;
  users: IUser[] = [];
  loginAttempts: ILoginAttempt[] = [];
  userBlockedFlag = false;

  get isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  constructor(private messageService: MessageService,
              private loginAttemptService: LoginAttemptsService,
              private userService: UserService) { }

  logout(): void {
    this.currentUser = null;
    this.isAdmin = null;
  }

  isRegisteredUser(userName: string, password: string): boolean
  {
    let userExist = false;
    for (const user of this.users) {
      if (user.userName === userName && user.password === password) {
        this.userBlockedFlag = false;
        userExist = true;
        this.currentUser = user;
        this.isAdmin = user.admin;

        if (user.admin === true) {
          this.messageService.addMessage(`Admin User: ${this.currentUser.userName} login`);
        } else{
          this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
        }
      }
      //User Exists --end IF
      else if ((user.userName === userName && user.password !== password) ||
      (user.userName !== userName && user.password === password))
      {
        this.userBlockedFlag = true;
        const loginAttempt: ILoginAttempt = this.getLoginAttempt(user.id);

        if (loginAttempt.count === 3) {
          alert('Unsuccessful login attempt ! Maximum count exceeded User Locked Contact Administrator');
        }
        else if (loginAttempt.count === 2) {
          loginAttempt.count = loginAttempt.count + 1;
          this.loginAttemptService.update(loginAttempt.id, loginAttempt);
          //Update Blocked User Flag
          user.blocked = true;
          this.userService.update(user.id, user);
          alert('Unsuccessful login attempt ! Count-3 ! Maximum count exceeded User Locked Contact Administrator');
        }
        else if (loginAttempt.count === 1) {
          loginAttempt.count = loginAttempt.count + 1;
          this.loginAttemptService.update(loginAttempt.id, loginAttempt);
          alert('Unsuccessful login attempt ! Count-2');
        }
        else {
          loginAttempt.count = loginAttempt.count + 1;
          this.loginAttemptService.update(loginAttempt.id, loginAttempt);
          alert('Unsuccessful login attempt ! Count-1');
        }
      }
      //User Login Attempts --end ELSE IF
      else {
        this.userBlockedFlag = false;
      }
      //User Does Not Exists --end ELSE
    }
    return userExist;
  }

  getLoginAttempt(userId: number): ILoginAttempt {
    for (const attempt of this.loginAttempts) {
      if (attempt.userId === userId) {
        return attempt;
      }
    }
  }
}
