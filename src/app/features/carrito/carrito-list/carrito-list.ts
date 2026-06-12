import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito-list.html',
  styleUrl: './carrito-list.css',
})
export class CarritoList {
  cartService = inject(CartService);

  incrementar(id: number) {
    this.cartService.actualizarCantidad(id, 1);
  }

  disminuir(id: number) {
    this.cartService.actualizarCantidad(id, -1);
  }

  eliminar(id: number) {
    this.cartService.eliminarDelCarrito(id);
  }

  irAPagar() {
    if (this.cartService.cartItems().length > 0 && this.cartService.totalUnidades() <= 10) {
      console.log('Avanzando a la pasarela de pago...');
    }
  }
}
