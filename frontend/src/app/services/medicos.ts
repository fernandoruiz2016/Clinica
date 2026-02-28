import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Medico {
  idMedico?: number; // Opcional porque al crear uno nuevo aún no tiene ID
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

  obtenerMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl);
  }
}
