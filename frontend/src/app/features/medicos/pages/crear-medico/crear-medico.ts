import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MedicoService } from '../../../../services/medicos';

@Component({
  selector: 'app-crear-medico',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-medico.html',
  styleUrls: ['./crear-medico.css'],
})
export class CrearMedico implements OnInit {

  medico = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    idEspecialidad: null as any,
  };

  especialidades: any[] = [];
  loading = false;

  constructor(
    private medicoService: MedicoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarEspecialidades();
  }

  cargarEspecialidades() {
    this.loading = true;

    this.medicoService.obtenerEspecialidades().subscribe({
      next: (data) => {
        console.log('Especialidades:', data);
        this.especialidades = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando especialidades', err);
        this.especialidades = [];
        this.loading = false;
      }
    });
  }

  guardarMedico() {

    if (!this.medico.idEspecialidad) {
      alert('Seleccione una especialidad');
      return;
    }

    this.medicoService.crearMedico(this.medico).subscribe({
      next: () => {
        alert('¡Médico registrado con éxito!');
        // 🔥 CORREGIDO AQUÍ (sin hacks)
        this.router.navigate(['/medicos']);
      },
      error: (err: any) => {
        console.error(err);
        alert(err.error?.error?.mensaje || 'Error al guardar médico');
      },
    });
  }
}