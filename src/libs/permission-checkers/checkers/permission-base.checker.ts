import { IPermissionsConfig } from '../permissions.interface';

export interface IPermissionChecker {
  check(permissions: IPermissionsConfig): boolean;
  setNextChecker(checker: PermissionBaseChecker): void;
}

export abstract class PermissionBaseChecker implements IPermissionChecker {
  private nextChecker?: PermissionBaseChecker;

  public abstract check(permission: IPermissionsConfig): boolean;
  public setNextChecker(checker: PermissionBaseChecker): void {
    this.nextChecker = checker;
  }

  protected checkNext(permissions: IPermissionsConfig): boolean {
    return (
      this.nextChecker !== undefined && this.nextChecker?.check(permissions)
    );
  }
}
