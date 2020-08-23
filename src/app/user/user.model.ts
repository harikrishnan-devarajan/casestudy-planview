export interface IUser
{
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zipcode: number;
  userName: string;
  admin: boolean;
  password: string;
  blocked: boolean;
}
