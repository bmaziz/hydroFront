import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: res => {
          console.log(res);
          
          const token = res.token;
          localStorage.setItem('auth-token', token);
          alert('Connexion réussie !');

          // Décoder le token pour récupérer le rôle
          const decoded: any = jwtDecode(token);
          const role = decoded.role;
          console.log(role);
          
          // Rediriger selon le rôle
          if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }
        },
        error: err => {
          alert(err.error.message);
        }
      });
    }
  }
}
