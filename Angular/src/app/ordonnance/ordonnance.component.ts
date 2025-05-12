import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-ordonnance',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.scss'],
})
export class OrdonnanceComponent implements OnInit {
  patient = {
    nom: '',
    prenom: '',
    dateNaissance: '',
    adresse: '',
  };

  medicaments: { nom: string; posologie: string }[] = [];
  nouveauMedicament = { nom: '', posologie: '' };
  today = new Date();
  private router: any;

  ngOnInit() {
    const ordonnanceId = window.location.search.split('id=')[1];
    if (ordonnanceId) {
      const ordonnances = JSON.parse(localStorage.getItem('ordonnances') || '[]');
      const ordonnance = ordonnances.find((o: any) => o.id === ordonnanceId);
      if (ordonnance) {
        this.patient = ordonnance.patient;
        this.medicaments = ordonnance.medicaments;
      }
    }
    const token = localStorage.getItem('token');
    if (token) {
      const role = (jwtDecode(token) as any).role;
      if (role !== 'doctor') {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  ajouterMedicament() {
    if (this.nouveauMedicament.nom && this.nouveauMedicament.posologie) {
      this.medicaments.push({ ...this.nouveauMedicament });
      this.nouveauMedicament = { nom: '', posologie: '' };
    }
  }

  supprimerMedicament(index: number) {
    this.medicaments.splice(index, 1);
  }

  sauvegarderOrdonnance() {
    const ordonnances = JSON.parse(localStorage.getItem('ordonnances') || '[]');
    const ordonnanceId = window.location.search.split('id=')[1];

    const ordonnance = {
      id: ordonnanceId || Date.now().toString(),
      patient: { ...this.patient },
      medicaments: [...this.medicaments],
      date: this.today.toISOString(),
    };

    if (ordonnanceId) {
      // Mise à jour
      const index = ordonnances.findIndex((o: any) => o.id === ordonnanceId);
      ordonnances[index] = ordonnance;
    } else {
      // Nouvelle ordonnance
      ordonnances.push(ordonnance);
    }

    localStorage.setItem('ordonnances', JSON.stringify(ordonnances));
    alert('Ordonnance sauvegardée !');
    this.resetForm();
  }

  imprimerOrdonnance() {
    window.print();
  }

  private resetForm() {
    this.patient = { nom: '', prenom: '', dateNaissance: '', adresse: '' };
    this.medicaments = [];
    this.nouveauMedicament = { nom: '', posologie: '' };
  }
}
