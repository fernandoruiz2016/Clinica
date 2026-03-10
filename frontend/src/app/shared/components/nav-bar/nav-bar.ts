import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogout() {
    localStorage.removeItem('token');

    console.log('Sesión finalizada en Clínica Lima del Mar');
    this.router.navigate(['/login']);
  }
}
