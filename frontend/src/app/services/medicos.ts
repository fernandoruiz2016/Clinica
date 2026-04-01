import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Medico {
  idMedico?: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  idEspecialidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class MedicoService {

  private apiUrl = 'http://localhost:3000/medicos';

  constructor(private http: HttpClient) {}

  // ✅ Obtener todos
  obtenerMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl);
  }

  // 🔥 AGREGAR ESTE
  obtenerMedicoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ✅ Crear
  crearMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.apiUrl, medico);
  }

  // 🔥 AGREGAR ESTE
  actualizarMedico(id: number, medico: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, medico);
  }

  // ✅ Eliminar
  eliminarMedico(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ✅ Especialidades
  obtenerEspecialidades(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/medicos/especialidades');
  }
}