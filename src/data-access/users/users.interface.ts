export interface IUsers {
    id:number;
    name:string;
    mobileNumber:string;
    email:string;
    password:string;
    roles: IUserRole[]
}

export interface IUserRole{
    id:number;
    name:string;
    permissions?:IUserPermission[];
}

export interface IUserPermission{
    id:number;
    name:string;
}