import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CoreModule } from './core/core.module';
import { CanActivateDashboard } from './core/guards/login';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [CanActivateDashboard],
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CoreModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
