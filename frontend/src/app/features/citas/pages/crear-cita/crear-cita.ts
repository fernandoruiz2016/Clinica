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
    console.log('Datos que se enviarán al backend:', this.nuevaCita);
    this.citaService.crearCita(this.nuevaCita).subscribe({
      next: (res) => {
        console.log('Cita creada:', res);
        alert('¡Cita registrada con éxito!');
        this.router.navigate(['/citas']); // Redirige a la tabla
      },
      error: (err) => {
        console.error('Error al crear cita:', err);
        alert('Hubo un error al guardar la cita.');
      },
    });
  }
}
