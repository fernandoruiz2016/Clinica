import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CitaService } from '../../../../services/citas';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './citas-component.html',
  styleUrls: ['./citas-component.css'],
})
export class CitasComponent implements OnInit {
  citas: any[] = [];

  filtros = {
    dni: '',
    fecha: '',
    estado: '',
  };

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.onFiltrar(); // Carga inicial obligatoria
  }

  onFiltrar(): void {
    this.citaService.filtrarCitas(this.filtros).subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          this.citas = [...data]; // Reemplazo total de la referencia
          console.log('Tabla debería tener ahora:', this.citas.length, 'filas');
        } else {
          this.citas = [];
        }
      },
    });
  }

  eliminarCita(id: number) {
    // 1. Confirmación de seguridad
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.citaService.eliminarCita(id).subscribe({
        next: () => {
          // 2. Si el backend responde OK, filtramos el array localmente
          // Esto quita la fila de la tabla instantáneamente
          this.citas = this.citas.filter((cita) => cita.id_cita !== id);

          // Opcional: Mostrar un mensaje de éxito
          alert('Cita eliminada correctamente');
        },
        error: (err) => {
          // 3. Manejo de errores (DNI no encontrado, error de servidor, etc.)
          console.error('Error al eliminar:', err);
          const mensaje = err.error?.error?.mensaje || 'No se pudo eliminar la cita';
          alert('Error: ' + mensaje);
        },
      });
    }
  }
}
