import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class ConversorDivisasService {

  constructor(private _http: HttpClient) { }

  public getTipoCambio(base: string, target: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key': 'dc466a32f9msh005473df48b9448p18f9ebjsnf477a6f6940a',
        'x-rapidapi-host': 'exchange-rate-api1.p.rapidapi.com' 
      }),
      params: new HttpParams()
      .set('base', base)
      .set('target', target)
    }

    return this._http.get("https://exchange-rate-api1.p.rapidapi.com/convert", httpOptions);
  }

  public createTransaccion(transaccion: Transaccion): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body: any = JSON.stringify(transaccion);
    return this._http.post("http://localhost:3000/api/transaccion/", body, httpOptions);
  }

  public getTransacciones(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get("http://localhost:3000/api/transaccion/", httpOptions);
  }

  public getTransaccionesPorDivisas(monedaOrigen: string, monedaDestino: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
        .set('monedaOrigen', monedaOrigen)
        .set('monedaDestino', monedaDestino)
    }
    return this._http.get("http://localhost:3000/api/transaccion/divisas", httpOptions);
  }
}
