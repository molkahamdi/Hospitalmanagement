import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { PaymentService } from '../services/payment.service';

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

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  clientSecret: string | null = null;

  // Code de validation
  generatedCode: string | null = null;
  paymentCode: string = '';
  showStripeForm = false;

  patient = {
    nom: '',
    prenom: '',
    dateVisite: '',
    montant: 0,
  };

  constructor(private paymentService: PaymentService) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_...'); // Remplace avec ta clé publique
  }

  /**
   * Génère un code de paiement à valider
   */
  generatePaymentCode(): void {
    this.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.showStripeForm = false;
    this.paymentSuccess = false;
    this.paymentError = null;
  }

  /**
   * Vérifie le code et initialise le paiement Stripe
   */initiatePayment(): void {
  this.loading = true;
  this.paymentError = null;

  const { nom, prenom, dateVisite, montant } = this.patient;

  if (!nom || !prenom || !dateVisite || montant <= 0) {
    this.loading = false;
    this.paymentError = 'Tous les champs doivent être remplis correctement.';
    return;
  }

  if (this.paymentCode !== this.generatedCode) {
    this.loading = false;
    this.paymentError = 'Le code de paiement est incorrect.';
    return;
  }

  this.paymentService
    .createCheckoutSession({ nom, prenom, montant })
    .subscribe({
      next: (res) => {
        window.location.href = res.url; // Redirect to Stripe hosted checkout
      },
      error: (err) => {
        this.paymentError = 'Erreur de paiement : ' + err.message;
        this.loading = false;
      },
    });
}



  /**
   * Confirme le paiement Stripe
   */
  async confirmPayment() {
    if (!this.stripe || !this.card || !this.clientSecret) {
      this.paymentError = 'Le formulaire de paiement n’est pas prêt.';
      return;
    }

    this.loading = true;

    const result = await this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: this.card,
        billing_details: {
          name: `${this.patient.nom} ${this.patient.prenom}`,
        },
      },
    });

    if (result.error) {
      this.paymentError = result.error.message!;
    } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      this.paymentSuccess = true;
      this.paymentIntentId = result.paymentIntent.id;
    }

    this.loading = false;
  }

  printReceipt(): void {
    window.print();
  }
}
