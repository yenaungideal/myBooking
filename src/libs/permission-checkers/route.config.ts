import { IPermissionsConfig } from './permissions.interface';
import { UserPermissionIds, UserRoleIds } from './user-permissions.enum';

export const ROUTE_PERMISSIONS: Record<string, IPermissionsConfig> = {
  '/dashboard': { userRoles: '*' },
  '/booking': { userRoles: [UserRoleIds.Admin, UserRoleIds.Staff] },
  '/users': {
    userRoles: [UserRoleIds.Admin],
    userPermissions: [
      UserPermissionIds.AddUser,
      UserPermissionIds.EditUser,
      UserPermissionIds.DeleteUser,
    ],
  },
  '/profile': { userRoles: [UserRoleIds.Admin] },
  '/logout': { userRoles: '*' },
};
