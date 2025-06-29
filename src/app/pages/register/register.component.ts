import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { IRegister } from '../../core/interfaces/http';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared/shared.module';
import { UserDataService } from '../../core/service/user-data.service';
import { NotifecationsService } from '../../core/service/notifecations.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

  name!: FormControl
  email!: FormControl
  password!: FormControl
  repassword!: FormControl
  registerationForm!: FormGroup
  isRegisterd: boolean = false;


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
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);;
    this.password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
    this.repassword = new FormControl('', [Validators.required, this.passwordMatch(this.password)]);
  }

  initFormGroupes(): void {
    this.registerationForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      repassword: this.repassword
    });
  }

  passwordMatch(pass: AbstractControl): ValidatorFn {
    return (rePass: AbstractControl): { [key: string]: boolean } | null => {
      if (rePass.value !== pass.value) {
        return { 'passwordMismatch': true };
      } else {
        return null;
      }
    }
  }

  submit() {
    if (this.registerationForm.invalid) {
      this.registerationForm.markAllAsTouched();
      Object.keys(this.registerationForm.controls).forEach(key => {
        this.registerationForm.get(key)?.markAsDirty();
      });
    } else {
      this.signUp(this.registerationForm.value as IRegister);
      this.isRegisterd = true;
    }
  }

  signUp(data: IRegister): void {
    this._authService.register(data).subscribe({
      next: (response) => {
        if (response._id) {
          this._notificationService.showSuccess('Registration Successful', 'You have successfully registered!');
          const { email, password } = data;
          this._authService.login({ email, password }).subscribe(() => {
            localStorage.setItem('token', response._id);
            this.router.navigate(['user']);
            this._userData.userName.next(response.name);
            localStorage.setItem('username', response.name)
          });
          this.registerationForm.reset();
        }
        this.router.navigate(['login']);
      },
      error: (error) => {
        this._notificationService.showError('Registration Failed', error.error.error || 'An error occurred during registration!');
      }
    })
  }

}
