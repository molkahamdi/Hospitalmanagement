import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {SharedService} from '../../../shared.service';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
} from "@angular/material/card";

@Component({
  selector: 'app-list-doctors',
  standalone: true,
    imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle],
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.css']
})
export class ListDoctorsComponent implements OnInit {
  doctors: any[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.getAllUsers().subscribe({
      next: (users: any[]) => {
        this.doctors = users.filter(u => u.role === 'doctor');
      },
      error: err => {
        console.error('Erreur lors du chargement des médecins', err);
      }
    });
  }

  delete(id: string): void {
    this.sharedService.delete(id).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error(err)
    });
  }
}
