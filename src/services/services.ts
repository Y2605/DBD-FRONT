import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListadoIPERC } from '../app/models/models';

// Importa el modelo ListadoIPERC (ajusta la ruta según corresponda)


@Injectable({
  providedIn: 'root'
})
export class BuenaVenturaService {

  private apiUrl = 'http://localhost:8082/buenaventura/';  // URL a tu backend de Spring Boot

  constructor(private http: HttpClient) { }

  /**
   * Método para obtener el listado de IPERC.
   * @returns Observable de ListadoIPERC[]
   */
  getListadoIPERC(): Observable<ListadoIPERC[]> {
    return this.http.get<ListadoIPERC[]>(this.apiUrl+'getListadoIPERC');
  }
}
