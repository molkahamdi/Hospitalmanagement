import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../../../shared.service';

@Component({
  selector: 'app-view-doctor',
  standalone: true,
    imports: [
        FormsModule,
        RouterLink
    ],
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.css'
})
export class ViewDoctorComponent implements OnInit {

  doctor : any;
  id: any;
  nom: string = '';


  constructor(private http: HttpClient, private act: ActivatedRoute, private _shared : SharedService, private router: Router) { }


  update() {
    this._shared.updatePatient(this.id, this.doctor)
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
        console.log('loaded:', res);
        this.doctor = res;
      },
      error: err => {
        console.error('Error loading doctor:', err);
      }
    });
  }

}
