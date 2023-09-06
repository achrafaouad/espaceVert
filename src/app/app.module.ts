import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxSpinnerModule } from "ngx-spinner";

import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgApexchartsModule } from "ng-apexcharts";
import { TimeService } from "./time.service"
import {MatButtonModule} from '@angular/material/button';

import { HelperCardconponentComponent } from './helper-cardconponent/helper-cardconponent.component';
import { SitedetailComponent } from './sitedetail/sitedetail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AgentsComponent } from './agents/agents.component';
import { UserListComponent } from './user-list/user-list.component';
import { AgentProfilComponent } from './agent-profil/agent-profil.component';
import { AgentProfilEditComponent } from './agent-profil-edit/agent-profil-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NotificationListComponentComponent } from './notification-list-component/notification-list-component.component';
import { NewEspaceComponent } from './new-espace/new-espace.component';
import { AddEspaceComponent } from './add-espace/add-espace.component';
import { SearchPipe } from './search.pipe';
import { EditerComponent } from './editer/editer.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    SublevelMenuComponent,
    HelperCardconponentComponent,
    SitedetailComponent,
    LoginComponent,
    AgentsComponent,
    UserListComponent,
    AgentProfilComponent,
    AgentProfilEditComponent,
    NotificationListComponentComponent,
    NewEspaceComponent,
    AddEspaceComponent,
    SearchPipe,
    EditerComponent
  ],
  imports: [
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatExpansionModule,
    NgApexchartsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [TimeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
