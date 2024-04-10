import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserAccount } from '../../models/User';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  showPassword = false;

  signupForm = new FormGroup({
    email: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) { }
  signup() {
    if (this.signupForm.valid) {

      const newUser = new UserAccount(
        this.signupForm.value.username ?? '',
        this.signupForm.value.email ?? '',
        this.signupForm.value.password ?? '',
        this.signupForm.value.password_confirmation ?? '',
        this.signupForm.value.first_name ?? '',
        this.signupForm.value.last_name ?? '',
      );

      this.authService.signup(newUser).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}