import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 

})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: res => {
          localStorage.setItem('auth-token', res.token);
          alert('Connexion réussie !');
          console.log('Token :', res.token);

          // (Optionnel) rediriger vers une autre page après login
          // this.router.navigate(['/dashboard']);
        },
        error: err => {
          alert(err.error.message || 'Erreur de connexion');
        }
      });
    }
  }
}
