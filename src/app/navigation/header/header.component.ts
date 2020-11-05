import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../login/login.service';
import { MessageService } from '../../messages/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  pageTitle = 'planview';

  constructor(private router: Router,
              private loginService: LoginService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  get isLoggedIn(): boolean {
    return this.loginService.isLoggedIn;
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  get userName(): string {
    if (this.loginService.currentUser) {
      return this.loginService.currentUser.userName;
    }
    return '';
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }

  logOut(): void {
    this.loginService.logout();
    this.messageService.clearMessages();
    this.router.navigateByUrl('/');
  }

}
