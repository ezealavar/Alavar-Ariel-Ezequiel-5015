import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaccion } from '../../models/transaccion';
import { ConversorDivisasService } from '../../services/conversor-divisas.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conversor-divisas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './conversor-divisas.component.html',
  styleUrl: './conversor-divisas.component.css'
})
export class ConversorDivisasComponent {
  transaccion!: Transaccion;
  tasa: number = 0;

  constructor(
      private transaccionService: ConversorDivisasService,
      private router: Router
  ) {
    this.iniciarVariable();
  }

  iniciarVariable():void {
    this.transaccion = new Transaccion();
  }

  async registrarTransaccion() {
    await this.obtenerTipoCambio();
    console.log(this.transaccion)
    console.log("tasa 1 : " + this.tasa)
    this.transaccion.tasaConversion = this.tasa;
    console.log("tasa conversoinr : " + this.transaccion.tasaConversion)
    this.transaccion.cantidadDestino = this.transaccion.cantidadOrigen * this.transaccion.tasaConversion;
    console.log(this.transaccion)
    this.transaccionService.createTransaccion(this.transaccion).subscribe(
      result => {
        if(result.status == 1) {
          alert('Transaccion creada con éxito');
          this.router.navigate(['conversor-lista']);
        }
      },
      error => {
        alert('Error al crear la transaccion');
        console.log(error);
      }
    )
  }

  obtenerTipoCambio() {
    return new Promise((resolve, reject) => {
      this.transaccionService.getTipoCambio(this.transaccion.monedaOrigen, this.transaccion.monedaDestino).subscribe(
        (result: any) => {
          console.log(this.transaccion.monedaOrigen);
          console.log(this.transaccion.monedaDestino);
          console.log(result);
          this.tasa = result.convert_result.rate;
          console.log('tasaAAAAAAA: ' + this.tasa)
          resolve(result);
        },
        (error: any) => {
          console.log(error);
          reject(error);
        }
      )
    });
  }

}
