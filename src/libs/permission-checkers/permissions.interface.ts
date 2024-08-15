import { UserPermissionIds, UserRoleIds } from "./user-permissions.enum";

export interface IPermissionsConfig{
    userRoles?: UserRoleIds[] | '*';
    userPermissions?: UserPermissionIds[];
}