import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PharmaComponent } from './pharma/pharma.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BedManagementComponent } from './bed-management/bed-management.component';

import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {authGuard} from './auth/auth.guard';
import {UrgenceComponent} from './urgence/urgence.component';
import {ListPatientsComponent} from './admin/patients/list-patients/list-patients.component';
import {AddPatientComponent} from './admin/patients/add-patient/add-patient.component';
import {UpdatePatientComponent} from './admin/patients/update-patient/update-patient.component';
import {AddDoctorComponent} from './admin/doctors/add-doctor/add-doctor.component';
import {ListDoctorsComponent} from './admin/doctors/list-doctors/list-doctors.component';
import {UpdateDoctorComponent} from './admin/doctors/update-doctor/update-doctor.component';
import {ViewPatientComponent} from './admin/patients/view-patient/view-patient.component';
import {ViewDoctorComponent} from './admin/doctors/view-doctor/view-doctor.component';
import { OrdonnanceComponent } from './ordonnance/ordonnance.component';
import { ListeOrdonnancesComponent } from './liste-ordonnances/liste-ordonnances.component';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
    { path:'', component:HomeComponent },
    {
      path: 'admin',
      component: AdminComponent,
      canActivate:[authGuard],
    },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'list-patients', component: ListPatientsComponent },
  { path: 'update-patient/:id', component: UpdatePatientComponent },
  { path: 'view-patient/:id', component: ViewPatientComponent },
  { path: 'add-doctor', component: AddDoctorComponent },
  { path: 'list-doctors', component: ListDoctorsComponent },
  { path: 'update-doctor/:id', component: UpdateDoctorComponent },
  { path: 'view-doctor/:id', component: ViewDoctorComponent },
  { path: 'pharma', component: PharmaComponent,
        children: [
          { path: 'medicament', loadComponent: () => import('./pharma/medicament/medicament.component').then(m => m.MedicamentComponent) },
          { path: '', redirectTo: 'medicament', pathMatch: 'full' }
        ]
      },
      { path: 'calendar', component: CalendarComponent},
      { path: 'Bed', component: BedManagementComponent},
      {path: 'register' , component: RegisterComponent },
      {path: 'login' , component: LoginComponent },
      {path: 'urgence' , component: UrgenceComponent },


      { path: 'ordo', redirectTo: '/ordonnance', pathMatch: 'full' },
      {
        path: 'ordonnance',
        loadComponent: () => import('./ordonnance/ordonnance.component').then(m => m.OrdonnanceComponent),
        canActivate: [authGuard]
      },
      { path: 'liste-ordonnances', component: ListeOrdonnancesComponent},
      { path: 'payment', component: PaymentComponent},



];

