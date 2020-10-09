import { ILoginAttempt } from './../login/loginAttempts.model';
import { LoginAttemptsService } from './../login/loginAttempts.service';
import { LoginService } from './../login/login.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from './user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private loginService: LoginService,
              private loginAttemptService: LoginAttemptsService) { }

  users: IUser[];

  ngOnInit(): void{
    this.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  public getAllUsers(): Observable<IUser[]> {
    return this.userService.get();
  }

  public redirectToUnblock = (id: number) => {
    this.userService.getByID(id).toPromise().then((user) => {

      this.userService.unblockUser(id, user as IUser).subscribe(
        response => response );

      const loginAttempt: ILoginAttempt = this.loginService.getLoginAttempt(id);
      loginAttempt.count = 0;
      this.loginAttemptService.update(loginAttempt.id, loginAttempt);

      this.getAllUsers().subscribe((data) => {
        this.users = data;
        this.router.navigateByUrl('/home');
      });

    }).catch((err) => {
      console.error(err);
    });
  }

  public redirectToDetails = (id: number) => {
    this.router.navigateByUrl('/user/' + id).then( response =>
      response
    );
  }

  public redirectToDelete = (id: number) => {
    this.userService.delete(id).toPromise().then( response =>
      response
    );
    this.getAllUsers().subscribe((data) => {
      this.users = data;
      this.router.navigateByUrl('/home');
    });
  }

}
