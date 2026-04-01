import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PacienteService, Paciente } from '../../../../services/pacientes';

@Component({
  selector: 'app-pacientes-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pacientes-component.html',
  styleUrls: ['./pacientes-component.css'],
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[] = [];

  filtros = {
    dni: '',
    nombre: '',
    apellido: '',
    telefono: '',
  };

  constructor(
    private pacienteService: PacienteService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.onFiltrar();
  }

  onFiltrar(): void {
    this.pacienteService.filtrarPacientes(this.filtros).subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          this.pacientes = [...data];
          this.cdr.detectChanges();
        } else {
          this.pacientes = [];
        }
      },
      error: (err) => {
        console.error('Error al filtrar pacientes:', err);
      }
    });
  }

  eliminarPaciente(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.pacienteService.eliminarPaciente(id).subscribe({
        next: () => {
          this.pacientes = this.pacientes.filter((p) => p.id_paciente !== id);
          alert('Paciente eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar paciente:', err);
          alert('No se pudo eliminar el paciente');
        },
      });
    }
  }
}
