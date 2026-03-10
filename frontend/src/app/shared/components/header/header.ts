import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  onLogout() {
    localStorage.removeItem('token');

    console.log('Sesión finalizada en Clínica Lima del Mar');
    this.router.navigate(['/login']);
  }
}
