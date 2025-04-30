import { Component } from '@angular/core';

@Component({
  selector: 'app-urgence',
  standalone: true,
  templateUrl: './urgence.component.html',
  styleUrls: ['./urgence.component.css'],
})
export class UrgenceComponent {

  // Fonction pour appeler l'hôpital
  callHospital() {
    window.location.href = "tel:+159654123";  // Remplacer par le numéro de téléphone réel
  }
}
