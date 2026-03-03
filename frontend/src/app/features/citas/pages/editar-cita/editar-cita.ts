import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CitaService } from '../../../../services/citas';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../../../services/pacientes';
import { MedicoService } from '../../../../services/medicos';

@Component({
  selector: 'app-editar-cita',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-cita.html',
  styleUrl: '../crear-cita/crear-cita.css',
})
export class EditarCita implements OnInit {
  idCita!: number;
  pacientes: any[] = [];
  medicos: any[] = [];

  // Objeto que se vinculará al formulario
  cita: any = {
    idPaciente: '',
    idMedico: '',
    fecha: '',
    hora: '',
    estado: '',
    monto: '',
    metodoPago: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
  ) {}

  ngOnInit() {
    this.idCita = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar las opciones para los selects
    this.pacienteService.obtenerPacientes().subscribe((data) => (this.pacientes = data));
    this.medicoService.obtenerMedicos().subscribe((data) => (this.medicos = data));

    // Cargar los datos de la cita
    this.citaService.obtenerCitaPorId(this.idCita).subscribe({
      next: (data) => {
        if (!data) return;

        // Formateo seguro: si no hay fecha/hora, ponemos string vacío para que no explote
        const fechaLimpia = data.fecha
          ? data.fecha.includes('T')
            ? data.fecha.split('T')[0]
            : data.fecha
          : '';
        const horaLimpia = data.hora
          ? data.hora.length > 5
            ? data.hora.substring(0, 5)
            : data.hora
          : '';

        this.cita = {
          idPaciente: data.id_paciente,
          idMedico: data.id_medico,
          fecha: fechaLimpia,
          hora: horaLimpia,
          estado: data.estado,
          monto: data.monto || 0, // Si es null, ponemos 0
          metodoPago: data.metodo_pago || 'Efectivo',
        };
      },
      error: (err) => console.error('Error detallado:', err),
    });
  }

  actualizarCita() {
    const datosEditados = {
      ...this.cita,
      idPaciente: Number(this.cita.idPaciente),
      idMedico: Number(this.cita.idMedico),
    };

    this.citaService.actualizarCita(this.idCita, datosEditados).subscribe({
      next: () => {
        alert('Cita actualizada correctamente');
        this.router.navigate(['/citas']);
      },
      error: (err) => {
        const msg = err.error?.error?.message || 'Error al actualizar';
        alert(msg);
      },
    });
  }
}
