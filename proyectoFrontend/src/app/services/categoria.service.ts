import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  urlBase: string = "http://localhost:3000/api/categoria/";

  constructor(private _http: HttpClient ) { }


  // public getCategoria(id: string): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //     }),
  //   }
  //   return this._http.get(this.urlBase + id, httpOptions);
  // }

  
  public getCategorias(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get(this.urlBase, httpOptions);
  }

  public createCategoria(categoria: Categoria): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body: any = JSON.stringify(categoria);

    return this._http.post("http://localhost:3000/api/categoria/", body, httpOptions);
  }
}
