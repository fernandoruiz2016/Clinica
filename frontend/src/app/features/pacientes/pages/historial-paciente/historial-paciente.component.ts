import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PacienteService } from '../../../../services/pacientes';

@Component({
  selector: 'app-historial-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './historial-paciente.component.html',
  styleUrls: ['./historial-paciente.component.css']
})
export class HistorialPacienteComponent implements OnInit {
  idPaciente!: number;
  historial: any[] = [];
  pacienteNombre: string = '';

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idPaciente = +id;
      this.cargarPaciente();
      this.cargarHistorial();
    }
  }

  cargarPaciente(): void {
    this.pacienteService.obtenerPacientes().subscribe({
      next: (pacientes) => {
        const p = pacientes.find(p => p.id_paciente === this.idPaciente);
        if (p) {
          this.pacienteNombre = `${p.nombre} ${p.apellido}`;
          this.cdr.detectChanges();
        }
      }
    });
  }

  cargarHistorial(): void {
    this.pacienteService.obtenerHistorial(this.idPaciente).subscribe({
      next: (data) => {
        this.historial = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar historial:', err);
      }
    });
  }
}
