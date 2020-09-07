import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-info',
  templateUrl: './cliente-info.component.html',
  styleUrls: ['./cliente-info.component.css']
})
export class ClienteInfoComponent implements OnInit {

  cliente: Cliente;

  constructor(
    private clienteService:ClienteService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.clienteService.readById(id).subscribe((cliente) => {
      this.cliente = cliente;
    });

  }
  cancelCliente(): void {
    this.router.navigate(['/clientes']);
  }

}
