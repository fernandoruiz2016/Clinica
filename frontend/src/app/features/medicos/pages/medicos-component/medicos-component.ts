import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MedicoService } from '../../../../services/medicos';

@Component({
  selector: 'app-medicos-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './medicos-component.html',
  styleUrls: ['./medicos-component.css'],
})
export class MedicosComponent implements OnInit {

  medicos: any[] = [];
  especialidades: any[] = [];

  filtros = {
    dni: '',
    nombre: '',
    apellido: '',
    telefono: '',
    idEspecialidad: ''
  };

  constructor(
    private medicoService: MedicoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
    this.onFiltrar();
  }

  cargarEspecialidades(): void {
    this.medicoService.obtenerEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
      },
      error: (err) => console.error('Error cargando especialidades', err)
    });
  }

  onFiltrar(): void {
    this.medicoService.obtenerMedicos(this.filtros).subscribe({
      next: (data: any) => {
        this.medicos = data && Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error filtrando médicos', err);
        this.medicos = [];
      }
    });
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar médico?')) {
      this.medicoService.eliminarMedico(id).subscribe({
        next: () => {
          this.medicos = this.medicos.filter(m => m.id_medico !== id);
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
  }
}