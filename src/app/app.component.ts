import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { LoginService } from './login/login.service';
import { MessageService } from './messages/message.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'planview';
  loading = true;

  constructor(private loginService: LoginService,
              private router: Router,
              private messageService: MessageService) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  get isLoggedIn(): boolean {
    return this.loginService.isLoggedIn;
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  get userName(): string {
    if (this.loginService.currentUser) {
      return this.loginService.currentUser.username;
    }
    return '';
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
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
    this.router.navigateByUrl('/welcome');
  }
}
