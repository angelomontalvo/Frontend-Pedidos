import { Routes } from '@angular/router';
import { ProductoList } from './features/productos/producto-list/producto-list';
import { MainLayout } from './layout/main-layout/main-layout';
import { CarritoList } from './features/carrito/carrito-list/carrito-list';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: ProductoList,
      },
      {
        path: 'carrito',
        component: CarritoList,
      },
      // {
      //   path: 'seguimiento',
      //   component: SeguimientoComponent,
      // },
    ],
  },
];
