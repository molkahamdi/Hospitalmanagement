import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../auth.service'; // Adjust path if needed

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formData = {
    nom: '',
    email: '',
    password: '',
    role: '',
    telephone: '',
    adresse: '',
    specialite: '',
    tarif: null
  };

  // ✅ Inject Router and AuthService
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.formData.role) {
      alert('Veuillez sélectionner un rôle');
      return;
    }

    this.authService.register(this.formData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => alert(err.error.message || 'Inscription échouée')
    });
  }

}
