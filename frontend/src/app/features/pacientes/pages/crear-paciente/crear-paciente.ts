import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PacienteService, Paciente } from '../../../../services/pacientes';

@Component({
  selector: 'app-crear-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-paciente.html',
  styleUrl: '../../paciente-form.css'
})
export class CrearPaciente {
  paciente: Paciente = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: ''
  };

  constructor(private pacienteService: PacienteService, private router: Router) {}

  onSubmit() {
    this.pacienteService.crearPaciente(this.paciente).subscribe({
      next: () => {
        alert('Paciente creado correctamente');
        this.router.navigate(['/pacientes']);
      },
      error: (err) => {
        console.error('Error al crear paciente:', err);
        alert('No se pudo crear el paciente');
      }
    });
  }
}
