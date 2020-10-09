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
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserEditComponent },
  { path: 'messages', component: MessageComponent },
  { path: 'users', component: UserListComponent },
  { path: 'worktype', component: WorkTypeComponent },
  { path: 'workitem', component: WorkItemComponent },
  { path: 'assignwork', component: AssignWorkComponent },
  { path: 'userworksheet', component: UserWorkSheetComponent },
  { path: 'userworksheets', component: UserWorkSheetListComponent },
  { path: '*', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
