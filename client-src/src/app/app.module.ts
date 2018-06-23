import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/main/navbar/navbar.component';
import { CustomerComponent } from './components/main/customer/customer.component';
import { ExpansionComponent } from './components/main/expansion/expansion.component';
import { BranchesComponent } from './components/main/branches/branches.component';
import { AdvertismentComponent } from './components/main/advertisment/advertisment.component';
import { LoyalCustomersComponent } from './components/main/customer/loyal-customers/loyal-customers.component';
import { MapComponent } from './components/main/map/map.component';
import { AddComponent } from 'src/app/components/main/branches/add/add.component';
import { RemoveComponent } from './components/main/branches/remove/remove.component';
import { AuthService } from './services/auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { AddcustomerComponent } from './components/main/customer/addcustomer/addcustomer.component';
import { RemovecustomerComponent } from './components/main/customer/removecustomer/removecustomer.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'main', component: MainComponent },
  { path: 'main/customer', component: CustomerComponent },
  { path: 'main/expansion', component: ExpansionComponent },
  { path: 'main/branches', component: BranchesComponent },
  { path: 'main/ads', component: AdvertismentComponent },
  { path: 'main/branches/add', component: AddComponent },
  { path: 'main/branches/remove', component: RemoveComponent },
  { path: 'main/customer/addcustomer', component: AddcustomerComponent },
  { path: 'main/customer/removecustomer', component: RemovecustomerComponent },
 
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
    AdvertismentComponent,
    LoyalCustomersComponent,
    MapComponent,
    AddComponent,
    RemoveComponent,
    
    RegisterComponent,
    AddcustomerComponent,
    RemovecustomerComponent,
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
