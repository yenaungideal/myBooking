import { UsersService } from "../../../data-access";
import { IPermissionsConfig } from "../permissions.interface";
import { PermissionBaseChecker } from "./permission-base.checker";

export class PermissionUserRoleCheck extends PermissionBaseChecker{
    public constructor(protected usersService:UsersService){
        super();
    }

    public override check(permissions: IPermissionsConfig): boolean{
        if(permissions?.userRoles){
            const currentUser = this.usersService.currentUser();
            if (permissions.userRoles === '*' || 
                (currentUser && currentUser.roles && permissions.userRoles.some((rId) => currentUser?.roles.some((v) => v.id === rId)))
            ){
                return true;
            }
            return false;
        }
        return this.checkNext(permissions);
    }
}