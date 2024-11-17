import {
  Component,
  Inject,
  OnInit,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
  SkipNonPrintableCharactersDirective,
  SkipWhitespaceDirective,
} from '../../libs/directives';
import { CommonModule } from '@angular/common';
import { Env } from '../../environments';
import {
  TRANSL_LANGS,
  TranslatePipe,
  TranslateService,
} from '../../libs/translation';
import { TranslocoService } from '@ngneat/transloco';
import { IUsers, UsersService } from '../../data-access';
import { AuthService, AuthStateEnum } from '../../data-access/auth';
import { IUserCredential } from './login.interface';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SkipNonPrintableCharactersDirective,
    SkipWhitespaceDirective,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm: FormGroup;
  public defaultLanguage = signal<'en' | 'zh'>('en');

  private router = inject(Router);
  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  private translocoService = inject(TranslocoService);
  // 'en' | 'xh' = 'en'; // Need to create lang interface.

  public constructor(@Inject('ENVIRONMENT') protected ENVIRONMENT: Env) {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    this.setDefaultLanguage('en');
  }

  public async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const { userEmail, password } = this.loginForm.value;
      // Handle login logic here
      const userCredential: IUserCredential = {
        userEmail: userEmail,
        password: password,
      };
      try {
        const user = await lastValueFrom(
          this.usersService.getUserByCredential<IUsers>(userCredential)
        );

        if (user) {
          this.setLoggedInUserAuthState();
          this.setCurrentUserState(user);
          this.router.navigate(['dashboard']);
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
