import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../shared.service';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';

@Component({
  selector: 'app-list-patients',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIcon,
    MatMiniFabButton,
    MatButtonModule,
    MatIconModule,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard
  ],
  templateUrl: './list-patients.component.html',
  styleUrl: './list-patients.component.css'
})
export class ListPatientsComponent implements OnInit {

  patients: any[] = [];

  constructor(public _shared: SharedService) {
  }

  ngOnInit(): void {

    this._shared.getAllUsers().subscribe({
      next: (res: any[]) => {
        this.patients = res.filter(u => u.role === 'patient');
        console.log('Filtered patients:', this.patients);
      },
      error: err => {
        console.error('Erreur lors du chargement des patients', err);
      }
    });
  }

  delete(id : any){
    this._shared.delete(id)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.ngOnInit();
        },
        (err: any) => {
          console.log(err);
        }
      )
  }

  update(id : any){
    this._shared.updatePatient(id , this.patients)
    .subscribe(
      (res: any) => {
        console.log(res);
        this.ngOnInit();
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

}
