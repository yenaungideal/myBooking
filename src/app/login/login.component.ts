import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IUsers, UsersService } from '../../data-access';
import { AuthService, AuthStateEnum } from '../../data-access/auth';
import { Env } from '../../environments';
import {
  SkipNonPrintableCharactersDirective,
  SkipWhitespaceDirective,
} from '../../libs/directives';
import { LanguageService, SupportedLanguage } from '../../libs/services';
import { TranslatePipe } from '../../libs/translation';
import { IUserCredential } from './login.interface';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    SkipNonPrintableCharactersDirective,
    SkipWhitespaceDirective,
    TranslatePipe,
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public readonly loginForm: FormGroup;
  public readonly errorMessage = signal<string | null>(null);
  public readonly isSubmitting = signal<boolean>(false);

  private readonly router = inject(Router);
  private readonly usersService = inject(UsersService);
  private readonly authService = inject(AuthService);
  private readonly languageService = inject(LanguageService);

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.loginForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const { userEmail, password } = this.loginForm.value;
      const userCredential: IUserCredential = {
        userEmail,
        password,
      };

      const user = await lastValueFrom(
        this.usersService.getUserByCredential<IUsers>(userCredential)
      );

      if (user) {
        this.setLoggedInUserAuthState();
        this.setCurrentUserState(user);
        await this.router.navigate(['dashboard']);
      } else {
        this.errorMessage.set('Invalid credentials. Please try again.');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred during login.';
      this.errorMessage.set(message);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  public setLanguage(lang: SupportedLanguage): void {
    this.languageService.setLanguage(lang);
  }

  public get currentLanguage(): SupportedLanguage {
    return this.languageService.currentLanguage();
  }

  private setLoggedInUserAuthState(): void {
    const state = {
      token: 123,
      status: AuthStateEnum.SUCCESSED,
      sessionExpiry: 123,
    };
    this.authService.setAuthState(state);
  }

  private setCurrentUserState(users: IUsers): void {
    this.usersService.setCurrentUser(users);
  }
}
