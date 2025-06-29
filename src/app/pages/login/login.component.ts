
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { ILogin } from '../../core/interfaces/http';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { UserDataService } from '../../core/service/user-data.service';
import { NotifecationsService } from '../../core/service/notifecations.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  email!: FormControl
  password!: FormControl
  loginForm!: FormGroup


  constructor(
    private _authService: AuthService,
    private _notificationService: NotifecationsService,
    private router: Router,
    private _userData: UserDataService
  ) {
    this.initFormControls();
    this.initFormGroupes();
  }

  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);;
    this.password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
  }

  initFormGroupes(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsDirty();
      });
    } else {
      this.signIn(this.loginForm.value as ILogin);
    }
  }

  signIn(data: ILogin): void {
    this._authService.login(data).subscribe({
      next: (response) => {
        if (response._id) {
          this._notificationService.showSuccess('Login Successful', 'Welcome back!');
          this.loginForm.reset();
          localStorage.setItem('token', response._id);
          this._userData.userName.next(response.name);
          localStorage.setItem('username', response.name)
        }
        this.router.navigate(['user']);
      },
      error: (error) => {
        this._notificationService.showError('Login Failed', error.error.error || 'An error occurred during login!');
      }
    })
  }

}
