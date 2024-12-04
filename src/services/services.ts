import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado, ListadoIPERC,Informe } from '../app/models/models';

// Importa el modelo ListadoIPERC (ajusta la ruta según corresponda)


@Injectable({
  providedIn: 'root'
})
export class BuenaVenturaService {

  private apiUrl = 'http://localhost:8082/buenaventura/';  // URL a tu backend de Spring Boot

  constructor(private http: HttpClient) { }

  
  getListadoIPERC(): Observable<ListadoIPERC[]> {
    return this.http.get<ListadoIPERC[]>(this.apiUrl+'getListadoIPERC');
  }

  getEmpleados(idProceso: number|null): Observable<Empleado[]> {
    let params = new HttpParams();
    if (idProceso !== null) {
      params = params.set('id_proceso', idProceso.toString());
    }

    return this.http.get<Empleado[]>(this.apiUrl+'getEmpleados', { params });
  }

  getInforme(idProceso:number):Observable<Informe>{
    let params = new HttpParams();
    if (idProceso !== undefined && idProceso !== null) {
      params = params.set('id_proceso', idProceso.toString());
    }
    return this.http.get<Informe>(this.apiUrl+'getInforme',{params:params});
  }
}
