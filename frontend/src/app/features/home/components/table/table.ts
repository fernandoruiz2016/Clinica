import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CitaService } from '../../../../services/citas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
})
export class TableComponent implements OnInit {
  citas: any[] = [];

  filtros = {
    dni: '',
    fecha: '',
    estado: '',
  };

  constructor(
    private citaService: CitaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCitas(); // Carga inicial sin filtros
  }

  // Método genérico para cargar datos
  cargarCitas(): void {
    this.citaService.obtenerCitasHoy().subscribe((data) => {
      this.citas = data;
      this.cdr.detectChanges();
    });
  }

  // Método que se ejecuta al dar click en "Filtrar"
  // onFiltrar(): void {
  //   console.log('Filtrando con:', this.filtros);

  //   // Suponiendo que tu servicio tiene un método para filtrar
  //   this.citaService.filtrarCitas(this.filtros).subscribe((data) => {
  //     this.citas = data;
  //   });
  // }
}
