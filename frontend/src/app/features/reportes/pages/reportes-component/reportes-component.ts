import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CitaService } from '../../../../services/citas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes-component.html',
  styleUrl: './reportes-component.css',
})
export class ReportesComponent implements OnInit, AfterViewInit {
  totalAtendidas: number = 0;
  totalCanceladas: number = 0;
  totalNoAsistidas: number = 0;
  chart: any;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.obtenerDataDeCitas();
  }

  ngAfterViewInit(): void {
    this.inicializarGrafico();
  }

  obtenerDataDeCitas(): void {
    this.citaService.filtrarCitas({}).subscribe({
      next: (citas: any[]) => {
        if (citas && citas.length > 0) {
          // Filtrado de estados (normalizado a minúsculas)
          this.totalAtendidas = citas.filter(c => 
            c.estado?.toLowerCase() === 'atendida' || c.estadoCita?.toLowerCase() === 'atendida'
          ).length;

          this.totalCanceladas = citas.filter(c => 
            c.estado?.toLowerCase() === 'cancelada' || c.estadoCita?.toLowerCase() === 'cancelada'
          ).length;

          this.totalNoAsistidas = citas.filter(c => 
            c.estado?.toLowerCase() === 'programada' || c.estadoCita?.toLowerCase() === 'programada'
          ).length;

          // Actualización de gráfico si ya existe el canvas
          if (this.chart) {
            this.actualizarGrafico(citas);
          } else {
            setTimeout(() => this.actualizarGrafico(citas), 200);
          }
        }
      },
      error: (err) => console.error('Error al obtener datos:', err)
    });
  }

  inicializarGrafico(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Citas por Especialidad',
          data: [],
          backgroundColor: ['#d2b4de', '#fcf3cf', '#aed6f1', '#f8c471', '#d5f5e3'],
          borderColor: '#333',
          borderWidth: 2
        }]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  actualizarGrafico(citas: any[]): void {
    if (this.chart) {
      const conteo: { [key: string]: number } = {};
      citas.forEach(c => {
        const esp = c.especialidad || 'General';
        conteo[esp] = (conteo[esp] || 0) + 1;
      });
      
      this.chart.data.labels = Object.keys(conteo);
      this.chart.data.datasets[0].data = Object.values(conteo);
      this.chart.update();
    }
  }
}