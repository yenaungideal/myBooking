import { Component, Inject, OnInit, signal } from '@angular/core';
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
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public defaultLanguage = signal<'en' | 'zh'>('en');
  // 'en' | 'xh' = 'en'; // Need to create lang interface.
  constructor(
    @Inject('ENVIRONMENT') protected ENVIRONMENT: Env,
    private router: Router,
    private translocoService: TranslocoService,
    private usersService: UsersService,
  ) {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public ngOnInit(): void {
    this.setDefaultLanguage('zh');
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      const { userEmail, password } = this.loginForm.value;
      // Handle login logic here
      console.log('Email:', userEmail);
      console.log('Password:', password);
      const user: IUsers = {
        id:1,
        name:'yenaung',
        email:userEmail,
        mobileNumber:'90294895',
        password:password,
        roles:[{id:1,name:'admin'}]
      }; 
      this.setCurrentUserState(user);
      this.router.navigate(['dashboard']);
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

  private setCurrentUserState(users:IUsers){
    this.usersService.setCurrentUser(users);
  }
}
