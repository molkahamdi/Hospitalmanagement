import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {SharedService} from '../../../shared.service';
import {SidebarComponent} from '../../../Components/sidebar/sidebar.component';
import {ListPatientsComponent} from '../list-patients/list-patients.component';

@Component({
  selector: 'app-update-patient',
  standalone: true,
  imports: [
    FormsModule,
    SidebarComponent,
    ListPatientsComponent,
    RouterLink
  ],
  templateUrl: './update-patient.component.html',
  styleUrl: './update-patient.component.css'
})
export class UpdatePatientComponent implements OnInit {

  patient : any;
  id: any;
  nom: string = '';


  constructor(private http: HttpClient, private act: ActivatedRoute, private _shared : SharedService, private router: Router) { }


  update() {
    this._shared.updatePatient(this.id, this.patient)
    .subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/admin']);
      },
      error => {
        console.log(error);
      }
    )

  }

  ngOnInit(): void {
    const rawId: string|null = this.act.snapshot.paramMap.get('id');
    console.log('Route param id =', rawId);

    if (!rawId) {
      console.error('Invalid ID in route!');
      return;
    }

    this.id = rawId;

    this._shared.getUserById(this.id).subscribe({
      next: res => {
        console.log('Hero loaded:', res);
        this.patient = res;
      },
      error: err => {
        console.error('Error loading patient:', err);
      }
    });
  }
}
