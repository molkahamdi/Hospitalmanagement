import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-bed-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // Modules Material requis
    MatButtonModule,
    MatCardModule,       // Pour mat-card, mat-card-header, etc.
    MatIconModule,       // Pour mat-icon
    MatSelectModule,     // Pour mat-select et mat-option
    MatFormFieldModule,  // Pour mat-form-field et mat-label
    MatOptionModule,     // Pour mat-option
    MatInputModule       // Requis pour mat-form-field
  ],
  templateUrl: './bed-management.component.html',
  styleUrls: ['./bed-management.component.scss']
})
export class BedManagementComponent {
  beds = [
    { id: 1, roomNumber: '101A', status: 'available', department: 'Cardiologie' },
    { id: 2, roomNumber: '101B', status: 'occupied', patientName: 'mootez Aouinti', department: 'Neurologie' },
    { id: 3, roomNumber: '102A', status: 'maintenance', department: 'Pédiatrie' }
  ];

  selectedBed: any = null;
  departments = ['Tous', 'Cardiologie', 'Neurologie', 'Pédiatrie'];
  selectedDepartment = 'Tous';

  selectBed(bed: any) {
    this.selectedBed = bed;
  }

  get filteredBeds() {
    if (this.selectedDepartment === 'Tous') return this.beds;
    return this.beds.filter(bed => bed.department === this.selectedDepartment);
  }

  assignPatient(bed: any) {
    const patientName = prompt('Nom du patient à affecter :');
    if (patientName) {
      bed.status = 'occupied';
      bed.patientName = patientName;
    }
  }

  getStatusText(status: string): string {
    const statusMap: any = {
      'occupied': 'Occupé',
      'available': 'Disponible',
      'maintenance': 'En maintenance'
    };
    return statusMap[status] || status;
  }
}