import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../../services/citas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
})
export class TableComponent implements OnInit {
  citas: any[] = [];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.obtenerCitasHoy().subscribe((data) => {
      this.citas = data;
    });
  }
}
