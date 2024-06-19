import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { Espectador } from '../../models/espectador';
import { EspectadorService } from '../../services/espectador.service';
import { tick } from '@angular/core/testing';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css'
})
export class TicketFormComponent {
  ticket!: Ticket;
  espectadores = Array<Espectador>();
  categorias = Array<Categoria>();
  accion: string = '';

  constructor(
    private ticketService : TicketService, 
    private espectadorService: EspectadorService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.iniciarVariable();
    this.obtenerEspectadores();
    this.obtenerCategorias();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['id'] == "0" || params['id'] == undefined || params['id'] == '') {
        this.accion = "new";
        this.iniciarVariable();
      } else {
        this.accion = "update";
        this.obtenerTicket(params['id'] );
      }
    });
  }

  obtenerTicket(id: string) {
    this.ticketService.getTicket(id).subscribe(
      result => {
        Object.assign(this.ticket, result);
        this.ticket.espectador = this.espectadores.find(espectador => espectador._id === this.ticket.espectador._id)!;
      }
    )
  }

  registrarTicket():void {
    console.log("TIckets: " + this.ticket)
    console.log("Categoria: " + this.ticket.categoria)
    this.ticketService.createTicket(this.ticket).subscribe(
      result => {
        if(result.status == 1) {
          alert('Ticket creado con éxito');
          this.router.navigate(['ticket-lista']);
        }
      },
      error => {
        alert('Error al crear el ticket');
        console.log(error);
      }
    )
    console.log("TIcketTT: " + this.ticket)
  }

  modificarTicket() {
    this.ticketService.updateTicket(this.ticket).subscribe(
      result => {
        if(result.status == 1) {
          alert('Ticket modificado con éxito');
          this.router.navigate(['ticket-lista']);
        }
      },
      error => {
        alert('Error al modificar el ticket');
        console.log(<any>error);
      }
    )
  }

  // obtenerEspectadores() {
  //   console.log("espectadores: " + this.espectadores);
  //   console.log("espectadores: " + this.espectadores[1]);
  //   this.ticketService.getEspectadores().subscribe(
  //     result => {
  //       let vespectador: Espectador = new Espectador();
  //       result.forEach((element: any) => {
  //         Object.assign(vespectador, element);
  //         this.espectadores.push(vespectador);
  //         vespectador = new Espectador();
  //       });
  //     }
  //   )
  //   console.log("espectadores: " + this.espectadores);
  //   console.log("espectadores: " + this.espectadores[1]);
  // }

  obtenerEspectadores() {
    this.espectadores = new Array<Espectador>();
    this.espectadorService.getEspectadores().subscribe(
      result => {
        this.espectadores = result.map((element: any) => {
          let vespectador: Espectador = new Espectador();
          Object.assign(vespectador, element);
          return vespectador;
        });
        console.log("espectadores: ", this.espectadores);
      }
    )
  }

  obtenerCategorias() {
    this.espectadores = new Array<Espectador>();
    this.categoriaService.getCategorias().subscribe(
      result => {
        this.categorias = result.map((element: any) => {
          let vcategoria: Categoria = new Categoria();
          Object.assign(vcategoria, element);
          return vcategoria;
        });
        console.log("categorias: ", this.categorias);
        // console.log("TICKETS: ", this.ticket);
      }
    )
  }

  iniciarVariable() {
    this.ticket = new Ticket();
    this.espectadores = new Array<Espectador>();
  }

  calcularPrecioCobrado() {
    if(this.ticket.categoriaEspectador === 'l') {
      this.ticket.precioCobrado = this.ticket.precioReal - (this.ticket.precioReal * 0.2);
    }
    else {
      this.ticket.precioCobrado = this.ticket.precioReal;
    }
  }

  verListado() {
    this.router.navigate(['ticket-lista'])
  }
}

