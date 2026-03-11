import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importamos HttpParams
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private API_URL = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  // 1. Registrar un nuevo empleado
  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, usuario);
  }

  // 2. Listar usuarios con filtros (usuario y rol)
  getUsuarios(filtros?: any): Observable<any[]> {
    let params = new HttpParams();

    if (filtros) {
      if (filtros.usuario) params = params.set('usuario', filtros.usuario);
      if (filtros.rol) params = params.set('rol', filtros.rol);
    }

    return this.http.get<any[]>(`${this.API_URL}/listado`, { params });
  }

  // 3. Eliminar un usuario por su ID
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
