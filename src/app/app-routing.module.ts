import { AuthguardService } from './login/authguard.service';
import { UserWorkSheetComponent } from './work/user-worksheet.component';
import { MessageComponent } from './messages/message.component';
import { UserListComponent } from './user/user-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './PageNoutFoundComponent';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { UserEditComponent } from './user/user-edit.component';
import { WorkTypeComponent } from './work/work-type.component';
import { WorkItemComponent } from './work/work-item.component';
import { AssignWorkComponent } from './work/assign-work.component';
import { UserWorkSheetListComponent } from './work/user-worksheet-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthguardService] },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserEditComponent, canActivate: [AuthguardService] },
  { path: 'messages', component: MessageComponent, canActivate: [AuthguardService] },
  { path: 'users', component: UserListComponent, canActivate: [AuthguardService] },
  { path: 'worktype', component: WorkTypeComponent, canActivate: [AuthguardService] },
  { path: 'workitem', component: WorkItemComponent, canActivate: [AuthguardService] },
  { path: 'assignwork', component: AssignWorkComponent, canActivate: [AuthguardService] },
  { path: 'userworksheet', component: UserWorkSheetComponent, canActivate: [AuthguardService] },
  { path: 'userworksheets', component: UserWorkSheetListComponent, canActivate: [AuthguardService] },
  { path: '*', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
