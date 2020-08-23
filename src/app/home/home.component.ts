import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../user/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: IUser;
  isAdmin: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.currentUser;
    this.isAdmin = this.loginService.isAdmin;
  }

}
