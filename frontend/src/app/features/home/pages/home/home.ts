import { Component, OnInit } from '@angular/core';
import { HomeCard } from '../../components/home-card/home-card';
import { TableComponent } from '../../components/table/table';
import { DashboardService } from '../../../../services/dashboard';


@Component({
  selector: 'app-home',
  imports: [HomeCard, TableComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  citas: number = 0;
  totalCitas: number = 0;
  totalPacientes: number = 0;

  datos: any = {};

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.obtenerDashboard().subscribe((data: any) => {
      this.citas = Number(data.citas_hoy);
      this.totalCitas = Number(data.citas_pendientes);
      this.totalPacientes = Number(data.total_pacientes);
    });
  }
}
