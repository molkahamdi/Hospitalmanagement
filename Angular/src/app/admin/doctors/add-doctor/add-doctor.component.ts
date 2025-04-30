import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {SharedService} from '../../../shared.service';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent {

  nom: string = '';

  doctor = {
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    specialite: '',
    tarif: '',
  };

  constructor(private _shared: SharedService, private router: Router) {}

  add() {
    const data = {
      ...this.doctor,
      role: 'doctor',
      password: 'defaultPassword123!'
    };

    this._shared.addUser(data).subscribe({
      next: () => {
        alert('Doctor ajouté avec succès');
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Erreur lors de l\'ajout');
      }
    });
  }

}
