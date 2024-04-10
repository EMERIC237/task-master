import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword = false;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if (username && password) {
      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login response:', response);
          this.router.navigate(['/home']).then(success => {
            console.log('Navigation success:', success);
          }).catch(err => {
            console.error('Navigation error:', err);
          });
        },
        error: (error) => {
          console.error('Login error:', error);
        }
      });
    }
  }


  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
