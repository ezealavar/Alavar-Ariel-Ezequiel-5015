import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent {
  producto!: Producto;

  constructor(private productoService: ProductoService, private router: Router) {
    this.iniciarVariable();
  }

  registrarProducto():void {
    this.productoService.createProducto(this.producto).subscribe(
      result => {
        if(result.status == 1) {
          alert('Producto creado con éxito');
          this.router.navigate(['producto']);
        }
      },
      error => {
        alert('Error al crear el producto');
        console.log(error);
      }
    )
  }

  iniciarVariable():void {
    this.producto = new Producto();
  }

  // cargarProducto() {
  //   this.productoService.getProductosDestacados(id).subscribe(
  //     result => {
  //       Object.assign(this.producto, result);
  //     }
  //   )
  // }
}
