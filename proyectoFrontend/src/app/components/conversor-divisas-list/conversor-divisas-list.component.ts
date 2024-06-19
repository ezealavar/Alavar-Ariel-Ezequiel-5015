import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConversorDivisasService } from '../../services/conversor-divisas.service';
import { Transaccion } from '../../models/transaccion';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversor-divisas-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversor-divisas-list.component.html',
  styleUrl: './conversor-divisas-list.component.css'
})
export class ConversorDivisasListComponent {
  constructor(
    private conversorDivisasService: ConversorDivisasService,
    private router: Router
  ) 
  { 
    this.obtenerTransacciones();
    this.iniciarVariable();
  }

  transacciones: Array<Transaccion> = [];
  transaccion!: Transaccion;

  obtenerTransacciones() {
    this.transacciones = [];
    this.conversorDivisasService.getTransacciones().subscribe(
      result => {
        let vtransaccion: Transaccion = new Transaccion();
        result.forEach((element: any) => {
          Object.assign(vtransaccion, element);
          this.transacciones.push(vtransaccion);
          vtransaccion = new Transaccion();
        });
      }
    )
  }
  
  obtenerTransaccionesPorDivisas() {
    this.transacciones = [];
    this.conversorDivisasService.getTransaccionesPorDivisas(this.transaccion.monedaOrigen, this.transaccion.monedaDestino).subscribe(
      result => {
        let vtransaccion: Transaccion = new Transaccion();
        result.forEach((element: any) => {
          Object.assign(vtransaccion, element);
          this.transacciones.push(vtransaccion);
          vtransaccion = new Transaccion();
        });
      }
    )
  }

  // obtenerTransacciones() {
  //   this.conversorDivisasService.getTransacciones().subscribe(
  //     result => {
  //       this.transacciones = result;
  //       });
  // }

  registrarTransaccion() {
    this.router.navigate(['conversor']);
  }

  iniciarVariable():void {
    this.transaccion = new Transaccion();
  }
}
