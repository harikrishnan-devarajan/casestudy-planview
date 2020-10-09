import { IWorkItem } from './work-item.model';

export interface IAssignWork
{
  id: number;
  userId: number;
  workItemCodes: string[];
}
