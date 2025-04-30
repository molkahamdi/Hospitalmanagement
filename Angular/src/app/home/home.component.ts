import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Statistiques en temps réel
  stats = [
    { icon: 'fas fa-user-injured', value: 1245, label: 'Patients aujourd\'hui' },
    { icon: 'fas fa-procedures', value: 86, label: 'Lits occupés' },
    { icon: 'fas fa-user-md', value: 58, label: 'Médecins disponibles' },
    { icon: 'fas fa-ambulance', value: 24, label: 'Urgences traitées' }
  ];

  // Services hospitaliers
  services = [
    {
      title: 'Consultation Générale',
      description: 'Prise en charge médicale par nos spécialistes qualifiés.',
      icon: 'fas fa-stethoscope'
    },
    {
      title: 'Urgences 24/7',
      description: 'Service d\'urgence disponible en permanence.',
      icon: 'fas fa-ambulance'
    },
    {
      title: 'Imagerie Médicale',
      description: 'Radiologie, IRM et échographie de pointe.',
      icon: 'fas fa-x-ray'
    },
    {
      title: 'Chirurgie',
      description: 'Blocs opératoires équipés des dernières technologies.',
      icon: 'fas fa-scalpel'
    },

    {
      titre: 'Chirurgie Réconstructrice',
      description: 'Techniques avancées de reconstruction faciale et implants personnalisés',
      icon: 'fas fa-syringe',
      color: '#4e73df'
    },
    {
      titre: 'Orthophonie Adultes/Enfants',
      description: 'Prise en charge des troubles du langage, de la déglutition et cognitifs',
      icon: 'fas fa-comment-medical',
      color: '#1cc88a'
    },
    {
      titre: 'ORL et Chirurgie Cervico-Faciale',
      description: 'Diagnostic et traitement des pathologies ORL avec endoscopie haute définition',
      icon: 'fas fa-ear-listen',
      color: '#f6c23e'
    },
    {
      titre: 'Centre Dentaire',
      description: 'Soins conservateurs, implants et blanchiment sous microscope opératoire',
      icon: 'fas fa-tooth',
      color: '#e74a3b'
    }
  ];


  actualites = [
    {
      titre: 'Nouveau scanner 3D',
      date: '15/06/2025',
      resume: 'Notre hôpital s\'équipe d\'un nouveau scanner haute résolution.',
      image: 'assets/images/scanner.jpg', // Chemin vers l'image
      alt: 'Nouveau scanner 3D haute technologie'
    },
    {
      titre: 'Campagne de vaccination',
      date: '01/06/2025',
      resume: 'Campagne de vaccination contre la grippe saisonnière.',
      image: 'assets/images/vaccination.jpg', // Chemin vers l'image
      alt: 'Campagne de vaccination contre la grippe'
    },
    {
      titre: 'Nouveau bloc de chirurgie maxillo-faciale',
      date: '01/07/2025',
      resume: 'Plateau technique dédié aux reconstructions faciales avec navigation 3D',
      image: 'assets/images/bloc.jpg',
      alt: 'Salle opératoire équipée',
      specialite: 'Chirurgie',
      badgeColor: '#4e73df',
      lien: '/chirurgie-maxillo'
    },
    {
      titre: 'Orthophonie : Protocole RehabTalk',
      date: '25/06/2025',
      resume: 'Nouvelle méthode de rééducation des troubles du langage',
      image: 'assets/images/ortho.jpg',
      alt: 'Séance d\'orthophonie numérique',
      specialite: 'Orthophonie',
      badgeColor: '#1cc88a',
      lien: '/orthophonie'
    },
    {
      titre: 'Micro-chirurgie ORL robotisée',
      date: '18/06/2025',
      resume: 'Premières interventions avec assistance robotique Da Vinci en cancérologie ORL',
      image: 'assets/images/ORL.jpg',
      alt: 'Robot chirurgical ORL',
      specialite: 'ORL',
      badgeColor: '#f6c23e',
      lien: '/orl'
    },
    {
      titre: 'Unité dentaire pédiatrique',
      date: '10/06/2025',
      resume: 'Espace dédié aux soins dentaires des enfants avec sédation consciente',
      image: 'assets/images/enfant.jpg',
      alt: 'Cabinet dentaire enfant',
      specialite: 'Dentaire',
      badgeColor: '#e74a3b',
      lien: '/dentaire'
    }
  ];
}