import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PacienteService, Paciente } from '../../../../services/pacientes';

@Component({
  selector: 'app-editar-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-paciente.html',
  styleUrl: '../../paciente-form.css',
})
export class EditarPaciente implements OnInit {
  idPaciente!: number;
  paciente: Paciente = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService
  ) {}

  ngOnInit() {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarPaciente();
  }

  cargarPaciente() {
    this.pacienteService.obtenerPacientePorId(this.idPaciente).subscribe({
      next: (data) => {
        this.paciente = data;
      },
      error: (err) => {
        console.error('Error al cargar paciente:', err);
        alert('No se pudo cargar la información del paciente');
        this.router.navigate(['/pacientes']);
      },
    });
  }

  actualizarPaciente() {
    this.pacienteService.actualizarPaciente(this.idPaciente, this.paciente).subscribe({
      next: () => {
        alert('Paciente actualizado correctamente');
        this.router.navigate(['/pacientes']);
      },
      error: (err) => {
        const msg = err.error?.error?.mensaje || 'Error al actualizar';
        alert(msg);
      },
    });
  }
}
