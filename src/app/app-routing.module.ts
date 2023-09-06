import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProductsComponent } from './products/products.component';
import { SitedetailComponent } from './sitedetail/sitedetail.component';
import { LoginComponent } from './login/login.component';
import { AgentsComponent } from './agents/agents.component';
import { UserListComponent } from './user-list/user-list.component';
import { AgentProfilComponent } from './agent-profil/agent-profil.component';
import { AgentProfilEditComponent } from './agent-profil-edit/agent-profil-edit.component';
import { NotificationListComponentComponent } from './notification-list-component/notification-list-component.component';
import { NewEspaceComponent } from './new-espace/new-espace.component';
import { AddEspaceComponent } from './add-espace/add-espace.component';
import { EditerComponent } from './editer/editer.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'editer', component: EditerComponent},
  {path: 'notifications', component: NotificationListComponentComponent},
  {path: 'info', component: SitedetailComponent},
  {path: 'newEspace', component: NewEspaceComponent},
  {path: 'addEspace', component: AddEspaceComponent},
  {path: 'dashboard', component: DashboardComponent
  , children:[
    {path:'' , component:ProductsComponent },
   
  ]},
  { path: 'typography',     component: AgentsComponent, children:[
    {path:'' , component:UserListComponent},
    {path:':id' , component:AgentProfilComponent},
    {path:':id/edit' , component:AgentProfilEditComponent}
]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
