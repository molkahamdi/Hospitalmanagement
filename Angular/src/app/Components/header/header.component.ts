import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string | null = null;
  isLoggedIn: boolean = false;
  nom: string | null = null;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getUserRole();
    this.nom = this.authService.getUserName(); // 👈 get user's nom

  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
