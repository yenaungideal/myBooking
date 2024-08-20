import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../../data-access/auth";

export function authGuard(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if(inject(AuthService).isAuthenticated){
        return true;
    }else{
        inject(Router).navigateByUrl('/login');
        return false;
    }
}