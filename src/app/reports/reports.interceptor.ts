import { IUser } from './../user/user.model';
import { LoginService } from './../login/login.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReports, IApiCounter } from './reports.model';

@Injectable()
export class ReportsInterceptor implements HttpInterceptor {

  user: IUser;
  // reportsMap be in the form of <K,V>Pairs which is userId:- number, reports:- IReports;
  reportsMap: Map<number, IReports> = new Map();

  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiname = req.url.split('/')[3];
    const dateTime = Date.now();
    this.user = this.loginService.currentUser;

    if (this.user === undefined || this.user === null) {
      console.log('ReportsInterceptor (url/timestamp) - ' + req.url + ' / ' + dateTime);
    } else {
      if (this.createReportOrUpdateReportsMap(apiname)) {
        console.log('ReportsInterceptor (url/user/timestamp) - ' + req.url + ' / ' + this.user.userName + ' / ' + dateTime);
      }
    }
    // UsabilityReport (apiname,username,count)
    return next.handle(req);
  }

  createReportOrUpdateReportsMap(apiname: string): boolean {
    let flag: boolean;
    let updatedApiCounter: IApiCounter;
    let indexValue: number;

    this.reportsMap.forEach((userReport, userId) => {
      if (userId === this.user.id) {
        // update report api count
        userReport.apiCounter.forEach((data, index) => {
          if (apiname === data.apiName)
          {
            flag = true;
            updatedApiCounter = data;
            indexValue = index;
          }
        });
      }
    });

    //update existing report
    if (updatedApiCounter !== undefined) {
      const transientReports = this.reportsMap.get(this.user.id);
      transientReports.apiCounter[indexValue] = updatedApiCounter;
    } else {
      // create a report
      const apicounter: IApiCounter = {
        apiName: apiname,
        count: 1
      };
      if (this.reportsMap.has(this.user.id)) {
        const report = this.reportsMap.get(this.user.id);
        report.apiCounter.push(apicounter);
      } else {
        const createReport: IReports = {
          userId: this.user.id,
          userName: this.user.userName,
          apiCounter: [apicounter]
        };
        console.log('Create Usability Report: ' + JSON.stringify(createReport));
        flag = true;
        this.reportsMap = this.reportsMap.set(this.user.id, createReport);
      }
    }

    return flag;
  }

}
