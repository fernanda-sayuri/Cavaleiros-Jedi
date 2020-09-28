import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home2Component } from './views/home/home2.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteInfoComponent } from './components/cliente/cliente-info/cliente-info.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AuthGuard } from './account/shared/auth.guard';
import { NavComponent } from './components/template/nav/nav.component';
import { FooterComponent } from './components/template/footer/footer.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent,
    children:
    [
      { path: "", component: Home2Component },
      { path: "clientes", component: ClienteCrudComponent },
      { path: "clientes/create", component: ClienteCreateComponent },
      { path: "clientes/update/:id", component: ClienteUpdateComponent },
      { path: "clientes/delete/:id", component: ClienteDeleteComponent },
      { path: "clientes/info/:id", component: ClienteInfoComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "", component: AuthenticationComponent,
    children:
    [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: LoginComponent },
      { path: "create-account", component: CreateAccountComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
