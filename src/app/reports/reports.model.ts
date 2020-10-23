export interface IReports {
  userId: number;
  userName: string;
  apiCounter: IApiCounter[];
}
export interface IApiCounter {
  apiName: string;
  count: number;
}
