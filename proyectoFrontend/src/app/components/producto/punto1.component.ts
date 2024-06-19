import { Component } from '@angular/core';
import { Producto } from '../../models/producto';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-punto1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto1.component.html',
  styleUrl: './punto1.component.css'
})
export class Punto1Component {

  productos: Array<Producto> = [];

  constructor(private productoService: ProductoService, 
              private router: Router) {
    this.productos = new Array<Producto>();
    this.obtenerProductosDestacados();
  }

  // productos = [
  //     { nombre: 'Notebook asus 13L', descripcion: 'disco 40GB, 15pulgadas', img: '../../../assets/img/asus-13L.webp', precio: 45.5, stock: 0, estado: false },
  //     { nombre: 'Notebook dell 15L', descripcion: 'disco 60GB, 15pulgadas', img: '../../../assets/img/dell.png', precio: 55.5, stock: 0, estado: false  },
  //     { nombre: 'Notebook hp 17L', descripcion: 'disco 80GB, 17pulgadas', img: '../../../assets/img/hp.webp', precio: 65.5, stock: 0, estado: false  },
  //     { nombre: 'Notebook lenovo 14L', descripcion: 'disco 70GB, 14pulgadas', img: '../../../assets/img/lenovo.jpeg', precio: 75.5, stock: 0, estado: false  },
  //     { nombre: 'Notebook acer 16L', descripcion: 'disco 90GB, 16pulgadas', img: '../../../assets/img/acer.jpg', precio: 85.5, stock: 0, estado: false  },
  //     { nombre: 'Notebook samsung 13L', descripcion: 'disco 50GB, 13pulgadas', img: '../../../assets/img/samsung.webp', precio: 95.5, stock: 0, estado: false  }
  // ]

  arrayCarrito: Producto[] = [];

  agregarCarrito(producto: Producto) {
    let productoExistente = this.arrayCarrito.find(prod => prod.nombre === producto.nombre);

    producto.stock ++;

    if(!productoExistente) {
      this.arrayCarrito.push(producto);
    }
  }

  obtenerMontoTotal() {
    let precio = 0

    for(let producto of this.arrayCarrito) {
      precio = precio + producto.stock * producto.precio;
    }

    return precio;
  }

  disminuirStock(producto:Producto) {
  producto.stock--;

  if (producto.stock === 0) {
    const indice = this.arrayCarrito.indexOf(producto);
    this.arrayCarrito.splice(indice, 1);
  }
}

  aumentarStock(producto: Producto) {
    producto.stock ++;
  }

  obtenerProductosDestacados() {
    this.productoService.getProductosDestacados().subscribe(
      result => {
        let vproducto: Producto = new Producto();
        result.forEach((element: any) => {
          Object.assign(vproducto, element);
          this.productos.push(vproducto);
          vproducto = new Producto();
        });
      }
    )
  }

  registrar() {
    this.router.navigate(['producto-form'])
  }

  modificar(producto: Producto) {
    this.router.navigate(['producto-form', producto._id])
  }
}
