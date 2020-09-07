import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

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
  deleteCliente(): void {
    this.clienteService.delete(this.cliente.id).subscribe(() => {
      this.clienteService.showMessage("Cliente excluído com sucesso!");
      this.router.navigate(['/clientes']);
    })
  }
  cancelCliente(): void {
    this.router.navigate(['/clientes']);
  }

}
