import { IPermissionsConfig } from '../permissions.interface';
import { PermissionUserRoleCheck } from './permission-user-role.checker';

export class PermissionUserPermissionCheck extends PermissionUserRoleCheck {
  public override check(permissions: IPermissionsConfig): boolean {
    if (permissions?.userPermissions) {
      const currentUser = this.usersService.currentUser();
      if (
        currentUser &&
        currentUser?.roles.some((role) =>
          role.permissions?.some((perm) =>
            permissions.userPermissions?.some((p) => p === perm.id)
          )
        )
      ) {
        return true;
      }
      return false;
    }
    return this.checkNext(permissions);
  }
}
