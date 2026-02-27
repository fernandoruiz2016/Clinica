import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private apiUrl = 'http://localhost:3000/citas/hoy';

  constructor(private http: HttpClient) {}

  obtenerCitasHoy() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
