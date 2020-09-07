import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { ClienteService } from './../cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    nome: '',
    idade: null,
    cpf: null,
    tel: null,
    email: ''
  }

  constructor(private clienteService:ClienteService, private router:Router) { }

  ngOnInit(): void {

  }
  createCliente(): void {
    this.clienteService.create(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente criado!');
      this.router.navigate(['/clientes']);
    });
  }
  cancelCliente(): void {
    this.router.navigate(['/clientes']);
  }
}
