import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste-ordonnances',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './liste-ordonnances.component.html',
  styleUrls: ['./liste-ordonnances.component.scss'],
})
export class ListeOrdonnancesComponent implements OnInit {
  ordonnances: any[] = [];

  ngOnInit() {
    this.chargerOrdonnances();
  }

  chargerOrdonnances() {
    this.ordonnances = JSON.parse(localStorage.getItem('ordonnances') || '[]');
  }

  supprimerOrdonnance(id: string) {
    if (confirm('Voulez-vous vraiment supprimer cette ordonnance ?')) {
      this.ordonnances = this.ordonnances.filter((o) => o.id !== id);
      localStorage.setItem('ordonnances', JSON.stringify(this.ordonnances));
    }
  }

  voirOrdonnance(id: string) {
    // Rediriger vers la page d'édition
    window.location.href = `/ordonnance?id=${id}`;
  }
}