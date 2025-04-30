import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Facture {
  id: string;
  patient: string;
  date: Date;
  montant: number;
  statut: 'payée' | 'impayée' | 'remboursée';
  type: 'consultation' | 'hospitalisation' | 'urgence';
}

@Component({
  selector: 'app-facturation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.css']
})
export class FacturationComponent {
  factures: Facture[] = [
    { id: 'FAC-2023-001', patient: 'Jean Dupont', date: new Date('2023-11-15'), montant: 150, statut: 'payée', type: 'consultation' },
    { id: 'FAC-2023-002', patient: 'Marie Curie', date: new Date('2023-11-18'), montant: 1200, statut: 'impayée', type: 'hospitalisation' },
    { id: 'FAC-2023-003', patient: 'Paul Durand', date: new Date('2023-11-20'), montant: 350, statut: 'remboursée', type: 'urgence' }
  ];

  displayedColumns: string[] = ['id', 'patient', 'date', 'montant', 'statut', 'actions'];
  selectedFacture: Facture | null = null;
  searchQuery = '';
  selectedStatut = 'tous';

  get filteredFactures() {
    return this.factures.filter(f => {
      const statutMatch = this.selectedStatut === 'tous' || f.statut === this.selectedStatut;
      const searchMatch = f.id.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                         f.patient.toLowerCase().includes(this.searchQuery.toLowerCase());
      return statutMatch && searchMatch;
    });
  }

  showDetails(facture: Facture) {
    this.selectedFacture = facture;
  }

  payerFacture(facture: Facture) {
    facture.statut = 'payée';
  }

  imprimerFacture(facture: Facture) {
    console.log('Impression de la facture', facture.id);
    // Logique d'impression ici
  }
}