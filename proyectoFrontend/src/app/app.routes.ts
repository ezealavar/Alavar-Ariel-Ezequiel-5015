import { Routes } from '@angular/router';
import { Punto1Component } from './components/producto/punto1.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ConversorDivisasComponent } from './components/conversor-divisas/conversor-divisas.component';
import { ConversorDivisasListComponent } from './components/conversor-divisas-list/conversor-divisas-list.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Producto',
        component: Punto1Component
    },
    {
        path: 'producto',
        title: 'Tienda de productos',
        component: Punto1Component
    },
    {
        path: 'producto-form',
        title: 'Registrar Productos',
        component: ProductoFormComponent
    },
    {
        path: 'conversor',
        title: 'Conversor de divisas',
        component: ConversorDivisasComponent
    },
    {
        path: 'conversor-lista',
        title: 'Conversor de divisas',
        component: ConversorDivisasListComponent
    },
    {
        path: 'ticket-lista',
        title: 'Tickets',
        component: TicketListComponent
    },
    {
        path: 'ticket-form',
        title: 'Registro de tickets',
        component: TicketFormComponent
    },
    {
        path: 'ticket-form/:id',
        title: 'Registro de tickets',
        component: TicketFormComponent
    }
];
