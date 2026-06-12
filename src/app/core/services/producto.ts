import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7034/api/producto';

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
