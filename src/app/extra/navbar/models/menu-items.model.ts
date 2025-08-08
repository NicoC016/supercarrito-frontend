import { IUserInfo } from "./user-info.model";

export interface IMenuItems { 
    label: string, 
    icon: string, 
    routerLink:string , 
    visible: boolean  | ((userInfo?: string) => boolean), 
    id:number, 
    active:boolean,
};

export interface ParamsVisible {
    userInfo: IUserInfo;
    loggedUser: boolean;
}