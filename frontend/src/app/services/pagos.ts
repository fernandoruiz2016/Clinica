import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private apiUrl = 'http://localhost:3000/pagos';

  constructor(private http: HttpClient) {}

  crearPago(pago: any): Observable<any> {
    // Realiza una petición POST al backend
    return this.http.post<any>(this.apiUrl, pago);
  }

  // Obtener una pago específica para llenar el formulario
  obtenerPagoPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Enviar los cambios (PUT o PATCH según tu backend)
  actualizarPago(id: number, pago: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, pago);
  }

  eliminarPago(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
