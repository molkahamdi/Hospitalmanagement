import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AddPatientComponent} from '../../admin/patients/add-patient/add-patient.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterLink,
    AddPatientComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {



}
