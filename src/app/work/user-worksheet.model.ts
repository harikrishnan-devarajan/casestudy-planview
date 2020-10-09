import { IWorkItem } from './work-item.model';
export interface IUserWorkSheet
{
  id: number;
  userId: number;
  userName: string;
  workItemCodes: string[];
  workWeek: Date;
  workHours: number;
  status: string;
}
