export interface ISignupRequest {
  email: string;
  password: string;
}

export interface ISignupResponse {
  id: number;
  name: string;
  mobileNumber: string;
  email: string;
  roles: IUserRole[];
}

export interface IUserRole {
  id: number;
  name: string;
}
