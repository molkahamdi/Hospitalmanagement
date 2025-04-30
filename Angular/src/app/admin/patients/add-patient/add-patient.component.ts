import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { SharedService } from '../../../shared.service';
import {SidebarComponent} from '../../../Components/sidebar/sidebar.component';
import {LayoutComponent} from '../../../Components/layout/layout.component';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {

  nom: string = '';

  patient = {
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
      ...this.patient,
      role: 'patient',
      password: 'defaultPassword123!'
    };

    this._shared.addUser(data).subscribe({
      next: () => {
        alert('Patient ajouté avec succès');
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Erreur lors de l\'ajout');
      }
    });
  }


}
