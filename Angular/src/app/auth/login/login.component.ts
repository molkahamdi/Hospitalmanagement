import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData = {
    email: '',
    password: ''
  };

  // ✅ Inject Router and AuthService here
  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin() {
    this.authService.login(this.formData).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        const role = res.user.role;
        console.log(res.token);
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        console.log(payload);

        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']); // ✅ Redirect doctor & patient to home
        }
      },
      error: err => {
        alert(err.error.message || 'Erreur lors de la connexion');
      }
    });
  }
}
