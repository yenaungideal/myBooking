export interface IAuthState {
    token?:number;
    status: AuthStateEnum; // successed  | locked 
    sessionExpiry?:number;
}

export enum AuthStateEnum{
    SUCCESSED = 'SUCCESSED',
    LOCAKED = 'LOCKED'
}