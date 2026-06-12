import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoService } from '../../../core/services/producto';
import { Producto } from '../../../models/producto';
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-list.html',
  styleUrls: ['./producto-list.css'],
})
export class ProductoList implements OnInit {
  private productoService = inject(ProductoService);

  productos = signal<Producto[]>([]);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos.set(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  //Agregar al carrito
  cartService = inject(CartService);

  // Método que llama el botón "AGREGAR AL CARRITO" del HTML
  onAgregar(producto: Producto, cantidad: number = 1) {
    this.cartService.agregarAlCarrito(producto, cantidad);
  }
}
