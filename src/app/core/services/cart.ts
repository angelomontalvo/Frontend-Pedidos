import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { Producto } from '../../models/producto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_KEY = 'pizza_cart';

  // Estado global con Signals
  cartItems = signal<CartItem[]>(this.loadCart());

  // Propiedades computadas reactivas (RN-04)
  totalUnidades = computed(() => this.cartItems().reduce((acc, item) => acc + item.cantidad, 0));

  subtotal = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0),
  );

  iva = computed(() => this.subtotal() * 0.1); // IVA del 10% según diseño

  total = computed(() => this.subtotal() + this.iva());

  constructor() {
    // Persistencia automática en localStorage
    effect(() => {
      localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems()));
    });
  }

  private loadCart(): CartItem[] {
    const saved = localStorage.getItem(this.CART_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  agregarAlCarrito(producto: Producto, cantidad: number = 1) {
    if (this.totalUnidades() + cantidad > 10) {
      // Validación de regla RN-01
      return;
    }

    this.cartItems.update((items) => {
      const index = items.findIndex((i) => i.producto.id === producto.id);
      if (index > -1) {
        const newItems = [...items];
        newItems[index].cantidad += cantidad;
        return newItems;
      }
      return [...items, { producto, cantidad }];
    });
  }

  actualizarCantidad(productoId: number, delta: number) {
    // Recibe un id de tipo number
    this.cartItems.update((items) => {
      return items
        .map((item) => {
          if (item.producto.id === productoId) {
            const nuevaCantidad = item.cantidad + delta;

            // Impedir incremento si ya se llegó al límite de 10 unidades (RN-01)
            if (delta > 0 && this.totalUnidades() >= 10) {
              return item;
            }
            return { ...item, cantidad: Math.max(0, nuevaCantidad) };
          }
          return item;
        })
        .filter((item) => item.cantidad > 0); // Si la cantidad llega a 0, se remueve automáticamente (RN-02)
    });
  }

  eliminarDelCarrito(productoId: number) {
    // Recibe un id de tipo number
    this.cartItems.update((items) => items.filter((i) => i.producto.id !== productoId));
  }
}
