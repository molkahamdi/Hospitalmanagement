import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MedicamentComponent } from './medicament/medicament.component';

@Component({
  selector: 'app-pharma',
  standalone: true,
  imports: [CommonModule, RouterModule, MedicamentComponent],
  templateUrl: './pharma.component.html',
  styleUrls: ['./pharma.component.css']
})
export class PharmaComponent {
  // Déclaration publique du router
  constructor(public router: Router) {}  // <-- Changement ici (private -> public)

  isRouteActive(): boolean {
    return !['/pharma', '/pharma/'].includes(this.router.url);
  }
}