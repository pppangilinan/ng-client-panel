import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";

import { Routes, RouterModule } from "@angular/router";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { FlashMessagesModule } from "angular2-flash-messages";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { AddClientComponent } from "./components/add-client/add-client.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
import { BsNavbarComponent } from "./components/bs-navbar/bs-navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

import { environment } from "./../environments/environment";

import { ClientService } from "./services/client.service";
import { AuthService } from "./services/auth.service";
import { AuthGuardService } from './services/guards/auth-guard.service';
import { RegisterGuardService } from './services/register/register-guard.service';
import { SettingsService } from './services/settings.service';

const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: "register", component: RegisterComponent, canActivate: [RegisterGuardService] },
  { path: "login", component: LoginComponent },
  { path: "add-client", component: AddClientComponent, canActivate: [AuthGuardService] },
  { path: "client/:id", component: ClientDetailsComponent, canActivate: [AuthGuardService] },
  { path: "edit-client/:id", component: EditClientComponent, canActivate: [AuthGuardService] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuardService] },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    BsNavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    ClientService,
    AuthService,
    AuthGuardService,
    RegisterGuardService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
