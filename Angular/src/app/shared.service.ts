import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private url = 'http://localhost:7000/api'; 

  constructor(private http: HttpClient) { }

  // Méthodes existantes
  addUser(data: any): Observable<any> {
    return this.http.post(`${this.url}/user/add`, data);
  }
 
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/user/getAllUsers`);
  }

  delete(id: any) {
    return this.http.delete(`${this.url}/user/delete/${id}`);
  }

  updatePatient(id: any, patient: any) {
    return this.http.put(`${this.url}/user/update/${id}`, patient);
  }

  getUserById(id: any) {
    return this.http.get(`${this.url}/user/getById/${id}`);
  }

  sendEmailNotification(to: string, subject: string, message: string) {
    const payload = { to, subject, message };
    return this.http.post(`${this.url}/email/sendemail`, payload);
  }

}
