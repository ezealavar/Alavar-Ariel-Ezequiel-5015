import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http: HttpClient) { }

  public getProductosDestacados(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get("http://localhost:3000/api/producto/destacados", httpOptions);
  }

  createProducto(producto: Producto): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body: any = JSON.stringify(producto);
    return this._http.post("http://localhost:3000/api/producto/", body, httpOptions);
  }
}
