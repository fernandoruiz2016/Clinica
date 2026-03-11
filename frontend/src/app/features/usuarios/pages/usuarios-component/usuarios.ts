import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../../services/usuarios';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];

  filtros = {
    usuario: '',
    rol: '',
  };

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.onFiltrar();
  }

  onFiltrar(): void {
    this.usuarioService.getUsuarios(this.filtros).subscribe({
      next: (data) => {
        this.usuarios = data && Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar usuarios:', err),
    });
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que deseas revocar el acceso a este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter((u) => u.id_usuario !== id);
          this.cdr.detectChanges();
          alert('Acceso eliminado correctamente');
        },
        error: (err) => alert('Error al eliminar usuario'),
      });
    }
  }
}
