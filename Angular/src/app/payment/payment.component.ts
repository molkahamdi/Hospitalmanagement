import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [DatePipe, FormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  loading = false;
  paymentError: string | null = null;
  paymentSuccess = false;
  paymentIntentId: string | null = null;
  paymentCode: string = '';
  generatedCode: string | null = null;

  // Nouveau modèle pour le patient
  patient = {
    nom: '',
    prenom: '',
    dateVisite: '',
    montant: 0
  };

  constructor() {}

  /**
   * Génère un code de paiement sécurisé à 6 chiffres
   */
  generatePaymentCode(): void {
    this.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Vérification du paiement
   */
  initiatePayment(): void {
    this.loading = true;
    this.paymentError = null;

    if (!this.patient.nom || !this.patient.prenom || !this.patient.dateVisite || this.patient.montant <= 0) {
      this.loading = false;
      this.paymentError = 'Tous les champs doivent être remplis correctement.';
      return;
    }

    if (this.paymentCode === this.generatedCode) {
      setTimeout(() => {
        this.loading = false;
        this.paymentSuccess = true;
        this.paymentIntentId = 'TX_' + Date.now();
      }, 2000);
    } else {
      setTimeout(() => {
        this.loading = false;
        this.paymentError = 'Le code de paiement est incorrect.';
      }, 2000);
    }
  }

  printReceipt(): void {
    window.print();
  }

  ngOnInit(): void {}
}
