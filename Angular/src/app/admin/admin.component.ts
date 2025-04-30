import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ListPatientsComponent } from './patients/list-patients/list-patients.component'
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton} from '@angular/material/button';
import {ListDoctorsComponent} from './doctors/list-doctors/list-doctors.component';
import {SharedService} from '../shared.service'; // ✅ Child component

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [CommonModule, RouterModule, ListPatientsComponent, MatIcon, MatButton, ListDoctorsComponent]
})
export class AdminComponent implements OnInit {
  nom: string = '';
  activeTab: string = 'patients'; // default to patients
  isSidebarCollapsed = false;

  totalPatients = 0;
  totalDoctors = 0;

  constructor(private router: Router , private _sharedService: SharedService,) {}

  ngOnInit(): void {
    this.decodeEmailFromToken();
    this.loadCounts();

  }

  decodeEmailFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.nom = decoded.nom || 'Utilisateur';
      } catch (e) {
        console.error('Erreur lors du décodage du token', e);
      }
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  show(tab: string): void {
    this.activeTab = tab;
  }

  loadCounts(): void {
    this._sharedService.getAllUsers().subscribe((users: any[]) => {
      this.totalPatients = users.filter(user => user.role === 'patient').length;
      this.totalDoctors = users.filter(user => user.role === 'doctor').length;
    });
  }
}
