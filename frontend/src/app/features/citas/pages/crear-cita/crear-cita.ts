import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../../services/citas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../../../services/pacientes';
import { MedicoService } from '../../../../services/medicos';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-crear-cita',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-cita.html',
  styleUrl: './crear-cita.css',
})
export class CrearCita implements OnInit {
  // Objeto que coincide con tu backend
  nuevaCita = {
    idPaciente: '',
    idMedico: '',
    fecha: '',
    hora: '',
    estado: 'Programada', // Valor inicial
    monto: null,
    metodoPago: 'Efectivo',
  };

  pacientes: any[] = [];
  medicos: any[] = [];

  constructor(
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cargarPacientes();
    this.cargarMedicos();
  }

  cargarPacientes(): void {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
        console.log('Pacientes cargados:', data);
      },
      error: (err) => console.error('Error al cargar pacientes', err),
    });
  }

  cargarMedicos(): void {
    this.medicoService.obtenerMedicos().subscribe({
      next: (data) => {
        this.medicos = data;
        console.log('Médicos cargados:', data);
      },
      error: (err) => console.error('Error al cargar médicos', err),
    });
  }

  guardarCita() {
    if (this.nuevaCita.monto && this.nuevaCita.monto > 0) {
      this.nuevaCita.estado = 'Atendida';
    }

    this.citaService.crearCita(this.nuevaCita).subscribe({
      next: (res) => {
        alert('¡Cita registrada con éxito!');
        this.router.navigate(['/citas']);
      },
      error: (err) => {
        console.error('Error:', err);
        alert(err.error?.error?.message || 'Hubo un error al guardar la cita.');
      },
    });
  }
}
