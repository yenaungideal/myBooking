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
import { AuthService } from '../../data-access/auth';
import { Env } from '../../environments';
import {
  SkipNonPrintableCharactersDirective,
  SkipWhitespaceDirective,
} from '../../libs/directives';
import { LanguageService, SupportedLanguage } from '../../libs/services';
import { TranslatePipe } from '../../libs/translation';
import { passwordErrorsValidators } from '../../libs/validators/password-validator';
import { matchPasswordValidator } from '../../libs/validators/password-validator/match-password.validator';
import { ISignupRequest, ISignupResponse } from './sign-up.interface';

@Component({
  selector: 'app-signup',
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
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  public readonly signupForm: FormGroup;
  public readonly errorMessage = signal<string | null>(null);
  public readonly isSubmitting = signal<boolean>(false);

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly languageService = inject(LanguageService);

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', passwordErrorsValidators),
      confirmPassword: new FormControl('', [
        Validators.required,
        matchPasswordValidator('password'),
      ]),
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.signupForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    try {
      const { email, password } = this.signupForm.value;
      const signupRequest: ISignupRequest = {
        email,
        password,
      };

      const user = await lastValueFrom(
        this.authService.registerUser<ISignupResponse>(signupRequest)
      );

      if (user) {
        // Navigate to login page after successful signup
        await this.router.navigate(['login']);
      } else {
        this.errorMessage.set('Registration failed. Please try again.');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred during registration.';
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
}
