import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { BranchesComponent } from './components/main/branches/branches.component';
import { ExpansionComponent } from './components/main/expansion/expansion.component';
import { CustomerComponent } from './components/main/customer/customer.component'

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'main', component: MainComponent },
  { path: 'main', component: CustomerComponent },
  { path: 'main', component: BranchesComponent },
  { path: 'main', component: MainComponent },
  { path: 'main', component: MainComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ExpansionComponent,
    CustomerComponent,
    BranchesComponent
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
