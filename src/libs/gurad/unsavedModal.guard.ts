// import { inject } from "@angular/core";
// import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

// export function authorGuard(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
//     if(inject(PermissionsService).routeHasPermission(state.url)){
//         return true;
//     }else{
//         inject(Router).navigateByUrl('/dashboard');
//         return false;
//     }
// }