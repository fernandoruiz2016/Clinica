import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  isReady = false;
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const isLoginPage = window.location.pathname.includes('/login');

      if (!token && !isLoginPage) {
        // No hay sesión: Al login
        this.router.navigate(['/login']);
      } else if (token && isLoginPage) {
        // Ya está logueado: No lo dejes entrar al login, mándalo al dashboard
        this.router.navigate(['/']);
      }
    }
  }
}
