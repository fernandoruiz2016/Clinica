import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicoService } from '../../../../services/medicos';

@Component({
  selector: 'app-editar-medico',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-medico.html',
  styleUrl: '../crear-medico/crear-medico.css',
})
export class EditarMedico implements OnInit {

  idMedico!: number;
  especialidades: any[] = [];

  medico: any = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    idEspecialidad: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicoService: MedicoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idMedico = Number(this.route.snapshot.paramMap.get('id'));

    this.cargarEspecialidades();
    this.cargarMedico();
  }

  cargarEspecialidades() {
    this.medicoService.obtenerEspecialidades().subscribe({
      next: (data: any) => {
        this.especialidades = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error cargando especialidades', err)
    });
  }

  cargarMedico() {
    this.medicoService.obtenerMedicoPorId(this.idMedico).subscribe({
      next: (data: any) => {

        const m = data;

        this.medico = {
          nombre: m.nombre,
          apellido: m.apellido,
          dni: m.dni,
          telefono: m.telefono,
          idEspecialidad: m.id_especialidad
        };

        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error cargando médico', err)
    });
  }

  actualizarMedico() {
    const datosEditados = {
      ...this.medico,
      idEspecialidad: Number(this.medico.idEspecialidad)
    };

    this.medicoService.actualizarMedico(this.idMedico, datosEditados).subscribe({
      next: () => {
        alert('Médico actualizado correctamente');
        this.router.navigate(['/medicos']);
      },
      error: (err: any) => {
        const msg = err.error?.error?.message || 'Error al actualizar';
        alert(msg);
      }
    });
  }
}