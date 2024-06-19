import { Component } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { CommonModule } from '@angular/common';
import { TipoEspectadorPipe } from '../../pipes/tipo-espectador.pipe';
import { FormsModule } from '@angular/forms';
import { EspectadorService } from '../../services/espectador.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, TipoEspectadorPipe, FormsModule],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent {
  tickets: any[] = [];
  ticket!: Ticket;
  categoria: string = '';
  // accion: string = 'new';

  constructor(
    private ticketService: TicketService, 
    private espectadorService: EspectadorService, 
    private router: Router
  ) {
    this.iniciarVariable();
    this.obtenerTickets()
  }


  // obtenerTickets() {
  //   console.log("tickets: " + this.tickets);
  //   console.log("tickets: " + this.tickets[1]);
  //   this._ticketService.getTickets().subscribe(
  //     result => {
  //       let vticket: Ticket = new Ticket();
  //       result.forEach((element: any) => {
  //         Object.assign(vticket, element);
  //         this.tickets.push(vticket);
  //         vticket = new Ticket();
  //       });
  //     }
  //   )
  //   console.log("tickets: " + this.tickets);
  //   console.log("tickets: " + this.tickets[1]);
  // }

  obtenerTickets() {
    this.ticketService.getTickets().subscribe(
      result => {
        this.tickets = result.map((element: any) => {
          let vticket: Ticket = new Ticket();
          Object.assign(vticket, element);
          return vticket;
        });
      }
    )
  }
  
  // obtenerTicketsPorCategoria(categoria: string) {
  //   this.ticketService.getTicket(categoria).subscribe(
  //     result => {
  //       Object.assign(this.ticket, result);
  //       this.tickets = this.tickets.find(ticket => ticket.categoriaEspectador === this.ticket.categoriaEspectador)!;
  //     }
  //   )
  // }

  obtenerTicketsPorCategoria(categoria: string) {
    console.log("Categoria: " + categoria)
    this.ticketService.getTicketsPorCategoria(categoria).subscribe(
      (result: any[]) => {
        this.tickets = result.filter(ticket => ticket.categoriaEspectador === categoria);
      }
    )
    this.espectadorService.getEspectadores();
  }

  obtenerTicketsPorCategoriaNuevo(categoria: string) {
    console.log("Categoria: " + categoria)
    this.ticketService.getTicketsPorCategoriaNuevo(categoria).subscribe(
      (result: any[]) => {
        this.tickets = result.filter(ticket => ticket.categoriaEspectador === categoria);
      }
    )
    this.espectadorService.getEspectadores();
  }

  registrarTicket() {
    this.router.navigate(['ticket-form', "0"])
  }

  eliminarTicket(ticket: Ticket):void {
    this.ticketService.deleteTicket(ticket).subscribe(
      result => {
        if(result.status == 1) {
          // alert('Ticket eliminado con éxito');
          this.cargarTickets(); // Asumiendo que tienes un método que carga los tickets desde el servidor
        }
      },
      error => {
        alert('Error al eliminar el ticket');
        console.log(error);
      }
    )
}

cargarTickets(): void {
  this.ticketService.getTickets().subscribe(
    tickets => {
      this.tickets = tickets;
    },
    error => {
      console.log(error);
    }
  )
}

  modificarTicket(ticket: Ticket) {
    this.router.navigate(['ticket-form', ticket._id])
  }

  iniciarVariable() {
    this.ticket = new Ticket();
  }


  obtenerTotalLocal() {
    let total = 0;
    
    for (let i = 0; i < this.tickets.length; i ++) {
      if(this.tickets[i].tipoEspectador === 'l')
        total += this.tickets[i].precioCobrado;
    }
    return total;
  }

  obtenerTotalExtranjero() {
    let total = 0;
    
    for (let i = 0; i < this.tickets.length; i ++) {
      if(this.tickets[i].tipoEspectador === 'e')
        total += this.tickets[i].precioCobrado;
    }
    return total;
  }

  obtenerTotalRecaudado() {
    let total = 0;
    
    for (let i = 0; i < this.tickets.length; i ++) {
      total += this.tickets[i].precioCobrado;
    }
    return total;
  }

  obtenerCantidadLocal() {
    let cantidad = 0;

    for(let i = 0; i < this.tickets.length; i++) {
      if(this.tickets[i].tipoEspectador === 'l') {
        cantidad ++;
      }
    }
    return cantidad;
  }

  obtenerCantidadExtranjero() {
    let cantidad = 0;

    for(let i = 0; i < this.tickets.length; i++) {
      if(this.tickets[i].tipoEspectador === 'e') {
        cantidad ++;
      }
    }
    return cantidad;
  }

  obtenerCantidadTotal() {
    return this.tickets.length;
  }
}
