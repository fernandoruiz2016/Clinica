import { Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
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
export class ReportesComponent implements OnInit, AfterViewInit, OnDestroy {
  totalAtendidas: number = 0;
  totalCanceladas: number = 0;
  totalNoAsistidas: number = 0;
  chart: any;
  private rawData: any[] = [];

  constructor(
    private citaService: CitaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerDataDeCitas();
  }

  ngAfterViewInit(): void {
    // Inicializar el gráfico después de que el view esté listo
    this.inicializarGrafico();
    
    // Si los datos ya llegaron, actualizar el gráfico inmediatamente
    if (this.rawData.length > 0) {
      this.actualizarGrafico(this.rawData);
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  obtenerDataDeCitas(): void {
    this.citaService.filtrarCitas({}).subscribe({
      next: (citas: any[]) => {
        this.rawData = citas || [];
        if (this.rawData.length > 0) {
          this.procesarEstadisticas(this.rawData);
          
          // Actualización de gráfico si ya existe el objeto chart
          if (this.chart) {
            this.actualizarGrafico(this.rawData);
          }
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al obtener datos:', err)
    });
  }

  procesarEstadisticas(citas: any[]): void {
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
  }

  inicializarGrafico(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (!ctx) return;

    // Destruir gráfico previo si existe para evitar duplicados en re-navegación
    if (this.chart) {
      this.chart.destroy();
    }

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
        scales: { 
          y: { 
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0
            }
          } 
        }
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
      this.cdr.detectChanges();
    }
  }
}