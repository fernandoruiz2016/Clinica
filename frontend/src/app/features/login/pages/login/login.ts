import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials = { usuario: '', clave: '' };
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    this.loading = true;
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.loading = false; // <-- APAGAR CARGANDO
        this.router.navigate(['']); // O la ruta que uses
      },
      error: (err) => {
        this.loading = false; // <-- APAGAR CARGANDO TAMBIÉN AQUÍ
        this.errorMessage = 'Error en el servidor o credenciales';
      },
    });
  }
}
