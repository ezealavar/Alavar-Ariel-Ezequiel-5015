import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  urlBase: string = "http://localhost:3000/api/ticket/";

  constructor(private _http: HttpClient) { }

  public getTickets(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get(this.urlBase, httpOptions);
  }

  public getTicket(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get(this.urlBase + id, httpOptions);
  }

  public getTicketsPorCategoria(categoria: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get("http://localhost:3000/api/ticket/categoriaEspectador/" + categoria, httpOptions);
  }

  public getTicketsPorCategoriaNuevo(categoria: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.get("http://localhost:3000/api/ticket/categoriaEspectador/parcial/" + categoria, httpOptions);
  }

  public createTicket(ticket: Ticket): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body: any = JSON.stringify(ticket);

    return this._http.post("http://localhost:3000/api/ticket/", body, httpOptions);
  }

  public updateTicket(ticket: Ticket): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body: any = JSON.stringify(ticket);

    return this._http.put(this.urlBase + ticket._id, body, httpOptions);
  }

  public deleteTicket(ticket: Ticket): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    }
    return this._http.delete("http://localhost:3000/api/ticket/" + ticket._id, httpOptions);
  }
}
