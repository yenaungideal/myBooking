import { Injectable } from "@angular/core";
import { IPermissionsConfig } from "./permissions.interface";
import { IPermissionChecker, PermissionUserPermissionCheck, PermissionUserRoleCheck } from "./checkers";
import { UsersService } from "../../data-access";
import { ROUTE_PERMISSIONS } from "./route.config";

@Injectable({providedIn:'root'})
export class PermissionsService{
    
    private permissionChecker!: IPermissionChecker;
    public constructor(private usersService:UsersService){}

    public hasPermissions(permissions: IPermissionsConfig | undefined): boolean{
        if(!permissions) return true;
        const checkers = this.getPermissionCheckers();
        return checkers?.check(permissions);
    }

    public routeHasPermission(routeUrl: string): boolean{
        const paramIndex = routeUrl.includes('/?')?routeUrl.indexOf('/?'):routeUrl.indexOf('?');
        const url = paramIndex > 0 ? routeUrl.substring(0,paramIndex):routeUrl;
        const permissions = ROUTE_PERMISSIONS[url];
        return !!permissions && this.hasPermissions(permissions);
    }

    private getPermissionCheckers(): IPermissionChecker{
        if(!this.permissionChecker){
            this.permissionChecker =  new PermissionUserRoleCheck(this.usersService);; 
            const userPermissionCheck = new PermissionUserPermissionCheck(this.usersService);
            this.permissionChecker.setNextChecker(userPermissionCheck);
        }
        return this.permissionChecker;
    }
}