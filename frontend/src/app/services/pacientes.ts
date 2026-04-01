import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Paciente {
  id_paciente?: number; // Opcional porque al crear uno nuevo aún no tiene ID
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private apiUrl = 'http://localhost:3000/pacientes';

  constructor(private http: HttpClient) {}

  obtenerPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  crearPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  filtrarPacientes(filtros: any): Observable<Paciente[]> {
    let params = new HttpParams();
    if (filtros.dni) params = params.set('dni', filtros.dni);
    if (filtros.nombre) params = params.set('nombre', filtros.nombre);
    if (filtros.apellido) params = params.set('apellido', filtros.apellido);
    if (filtros.telefono) params = params.set('telefono', filtros.telefono);

    return this.http.get<Paciente[]>(this.apiUrl, { params });
  }

  obtenerHistorial(idPaciente: number): Observable<any[]> {
    // Usamos el servicio de citas filtrando por idPaciente
    const citasUrl = 'http://localhost:3000/citas/buscar';
    let params = new HttpParams().set('idPaciente', idPaciente.toString());
    return this.http.get<any[]>(citasUrl, { params });
  }

  obtenerPacientePorId(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  actualizarPaciente(id: number, paciente: Paciente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, paciente);
  }

  eliminarPaciente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
