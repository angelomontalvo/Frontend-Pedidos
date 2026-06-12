import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoService } from '../../../core/services/producto';
import { Producto } from '../../../models/producto';

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
}
