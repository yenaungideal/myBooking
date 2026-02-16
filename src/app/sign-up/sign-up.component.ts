import { CommonModule } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
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
import { TranslocoService } from '@jsverse/transloco';
import { lastValueFrom } from 'rxjs';
import { AuthService, AuthStateEnum } from '../../data-access/auth';
import { Env } from '../../environments';
import {
  SkipNonPrintableCharactersDirective,
  SkipWhitespaceDirective,
} from '../../libs/directives';
import { TRANSL_LANGS, TranslatePipe } from '../../libs/translation';
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
})
export class SignupComponent {
  public signupForm: FormGroup;
  public defaultLanguage = signal<'en' | 'zh'>('en');

  private router = inject(Router);
  private authService = inject(AuthService);
  private translocoService = inject(TranslocoService);

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', passwordErrorsValidators),
      confirmPassword: new FormControl('', [
        Validators.required,
        matchPasswordValidator('password'),
      ]),
    });
    this.setDefaultLanguage('en');
  }

  public async onSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      const signupRequest: ISignupRequest = {
        email: email,
        password: password,
      };
      try {
        const user = await lastValueFrom(
          this.authService.registerUser<ISignupResponse>(signupRequest)
        );

        if (user) {
          // Navigate to login page after successful signup
          this.router.navigate(['login']);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  }

  public setDefaultLanguage(lang: 'en' | 'zh'): void {
    if (TRANSL_LANGS.includes(lang)) {
      this.translocoService.setActiveLang(lang);
      this.defaultLanguage.set(lang);
    } else {
      this.translocoService.setActiveLang('en');
      this.defaultLanguage.set('en');
    }
  }
}
