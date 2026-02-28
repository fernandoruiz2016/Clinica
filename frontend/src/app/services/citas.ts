import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private apiUrl = 'http://localhost:3000/citas';

  constructor(private http: HttpClient) {}

  crearCita(cita: any): Observable<any> {
    // Realiza una petición POST al backend
    return this.http.post<any>(this.apiUrl, cita);
  }

  obtenerCitasHoy(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/hoy`);
  }

  // Obtener una cita específica para llenar el formulario
  obtenerCitaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Enviar los cambios (PUT o PATCH según tu backend)
  actualizarCita(id: number, cita: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cita);
  }
  filtrarCitas(filtros: any): Observable<any[]> {
    let params = new HttpParams();

    if (filtros.dni) params = params.append('dni', filtros.dni);
    if (filtros.fecha) params = params.append('fecha', filtros.fecha);
    if (filtros.estado) params = params.append('estado', filtros.estado);

    return this.http.get<any[]>(`${this.apiUrl}/buscar`, { params });
  }

  eliminarCita(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
