import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  createCheckoutSession(data: {
  montant: number;
  nom: string;
  prenom: string;
}) {
  return this.http.post<{ url: string }>(
    '/api/payment/create-checkout-session',
    data
  );
}

}
