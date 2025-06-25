import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/service/auth.service';
import { IRegister } from '../../core/interfaces/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared/shared.module';

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


  constructor(
    private _authService: AuthService,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private router: Router) {
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
    }
  }

  signUp(data: IRegister): void {
    this.spinner.show();
    this._authService.register(data).subscribe({
      next: (response) => {
        if (response._id) {
          this.show('success', 'Registration Successful', 'You have successfully registered!');
          const { email, password } = data;
          this._authService.login({ email, password }).subscribe(() => {
            localStorage.setItem('token', response._id);
            this.router.navigate(['user']);
          });
          this.registerationForm.reset();
        }
        this.spinner.hide();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.show('error', 'Registration Failed', error.error.error || 'An error occurred during registration!');
        this.spinner.hide();
      }
    })
  }

  show(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }
}