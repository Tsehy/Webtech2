import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardCreateComponent } from './components/card-create/card-create.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardEditComponent } from './components/card-edit/card-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';


const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'login'},
  {path: 'card-create', component:CardCreateComponent},
  {path: 'card-edit/:id', component:CardEditComponent},
  {path: 'card-list', component:CardListComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registration', component:RegistrationComponent},
  {path: 'account-info', component:AccountInfoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
