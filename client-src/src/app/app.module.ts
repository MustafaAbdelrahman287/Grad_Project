import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/main/navbar/navbar.component';
import { CustomerComponent } from './components/main/customer/customer.component';
import { ExpansionComponent } from './components/main/expansion/expansion.component';
import { BranchesComponent } from './components/main/branches/branches.component';
import { AdvertismentComponent } from './components/main/advertisment/advertisment.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'main', component: MainComponent },
  { path: 'main/customer', component: CustomerComponent },
  { path: 'main/expansion', component: ExpansionComponent },
  { path: 'main/branches', component: BranchesComponent },
  { path: 'main/ads', component: AdvertismentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavbarComponent,
    CustomerComponent,
    ExpansionComponent,
    BranchesComponent,
    AdvertismentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
