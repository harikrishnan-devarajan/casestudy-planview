import { UserWorkSheetListComponent } from './work/user-worksheet-list.component';
import { UserWorkSheetComponent } from './work/user-worksheet.component';
import { WorkService } from './work/work.service';
import { AssignWorkComponent } from './work/assign-work.component';
import { WorkItemComponent } from './work/work-item.component';
import { WorkTypeComponent } from './work/work-type.component';
import { LoginAttemptsService } from './login/loginAttempts.service';
import { UserEditComponent } from './user/user-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './PageNoutFoundComponent';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list.component';

import { LoginService } from './login/login.service';
import { UserService } from './user/user.service';

import { MessageModule } from './messages/message.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    UserComponent,
    UserListComponent,
    HeaderComponent,
    UserEditComponent,
    WorkTypeComponent,
    WorkItemComponent,
    AssignWorkComponent,
    UserWorkSheetComponent,
    UserWorkSheetListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatTabsModule
  ],
  providers: [LoginService, UserService, LoginAttemptsService, WorkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
