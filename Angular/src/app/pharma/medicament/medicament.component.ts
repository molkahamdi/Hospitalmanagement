import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicament',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medicament.component.html',
  styleUrls: ['./medicament.component.css']
})
export class MedicamentComponent {
  medicaments = [
    {
      id: 8,
      name: 'vogalene',
      description: 'Ce médicament est un antiémétique qui appartient à la famille des phénothiazines. Il régularise la contraction des muscles de lœsophage et de lestomac. Il est utilisé pour traiter les nausées et les vomissements.',
      image: 'assets/images/vogalene.webp',
      quantity: 20,
      price: 45,
      category: 'Antalgique',
      stockAlert: 50,
      lab: 'Laboratoire x'
    },
    
    {
      id: 9,
      name: 'SPASFON',
      description: 'SPASFON appartient à une classe de médicaments appelés antispasmodiques. Il agit contre les spasmes (contractions). Ce médicament est indiqué dans le traitement des douleurs spasmodiques de lintestin, des voies biliaires, de la vessie et de lutérus.',
      image: 'assets/images/spasfon.webp',
      quantity: 20,
      price: 75,
      category: 'Antalgique',
      stockAlert: 70,
      lab: 'Laboratoire x'
    },
    {
      id: 3,
      name: 'Aspirine 500mg',
      description: 'L’acide acétylsalicylique, plus connu sous le nom commercial d’aspirine, est un antiagrégant plaquettaire. C’est la substance active de nombreux médicaments aux propriétés antalgiques, antipyrétiques et anti-inflammatoires. Il est surtout utilisé comme antiagrégant plaquettaire.',
      image: 'assets/images/aspirine.jpg',
      quantity: 20,
      price: 6,
      category: 'Antalgique',
      stockAlert: 15,
      lab: 'Laboratoire Z'
    },
    {
      id: 2,
      name: 'Ibuprofène 200mg',
      description: 'Ce médicament contient un anti-inflammatoire non stéroïdien : libuprofène. Il est indiqué, chez ladulte et lenfant de plus de 20 kg (soit environ 6 ans), dans le traitement de courte durée de la fièvre et/ou des douleurs telles que maux de tête, états grippaux, douleurs dentaires, courbatures et règles douloureuses.',
      image: 'assets/images/ibu.jpg',
      quantity: 30,
      price: 3,
      category: 'Anti-inflammatoire',
      stockAlert: 5,
      lab: 'Laboratoire Y'
    },
   
    {
      id: 4,
      name: 'doliprane 1000mg',
      description: 'Antidouleur',
      image: 'assets/images/doliprane.jpg',
      quantity: 20,
      price: 12,
      category: 'Antalgique',
      stockAlert: 16,
      lab: 'Laboratoire Z'
    },
    {
      id: 5,
      name: 'surgam',
      description: 'Antidouleur',
      image: 'assets/images/surgam.webp',
      quantity: 20,
      price: 11,
      category: 'Antalgique',
      stockAlert: 10,
      lab: 'Laboratoire Z'
    },
    {
      id: 6,
      name: 'panadol',
      description: ' antalgique et antipyrétique',
      image: 'assets/images/panadol.jpg',
      quantity: 20,
      price: 14,
      category: 'Antalgique',
      stockAlert: 30,
      lab: 'Laboratoire Z'
    },{
      id: 7,
      name: 'betadine',
      description: 'le traitement local dappoint et le nettoyage des affections de la peau et des muqueuses, infectées ou risquant de sinfecter',
      image: 'assets/images/betadine.jpg',
      quantity: 20,
      price: 10,
      category: 'Antalgique',
      stockAlert: 122,
      lab: 'Laboratoire Z'
    },
    {
      id: 1,
      name: 'Paracétamol 500mg',
      description: 'Le paracétamol, aussi appelé acétaminophène, est un composé chimique utilisé comme antalgique et antipyrétique, qui figure depuis le début des années 1950 parmi les médicaments les plus communément utilisés et prescrits au monde',
      image: 'assets/images/paracetamoll.jpg',
      quantity: 50,
      price: 4,
      category: 'Antalgique',
      stockAlert: 10,
      lab: 'Laboratoire X'
    }
   
  ];
}