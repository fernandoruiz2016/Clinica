import { Component } from '@angular/core';
import { UsuarioService } from '../../../../services/usuarios';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  imports: [FormsModule],
  templateUrl: './crear-usuario.html',
  styleUrl: './crear-usuario.css',
})
export class CrearUsuario {
  nuevoUsuario = {
    usuario: '',
    clave: '',
    rol: 'Admin',
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  registrar() {
    if (!this.nuevoUsuario.usuario || !this.nuevoUsuario.clave) {
      alert('Por favor, completa todos los campos');
      return;
    }

    this.usuarioService.registrar(this.nuevoUsuario).subscribe({
      next: (res) => {
        alert('¡Éxito! Usuario creado correctamente');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error(err);
        alert('Error: No se pudo crear el usuario. Verifica que no exista ya.');
      },
    });
  }

  limpiarFormulario() {
    this.nuevoUsuario = { usuario: '', clave: '', rol: 'Admin' };
  }
}
