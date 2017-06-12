import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UnauthenticatedGuard } from './unauthenticated.guard';
import { AppComponent } from './app.component';
import { AuthenticatedGuard } from './authenticated.guard';
import { IndexComponent } from './index/index.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [LoginComponent, SignUpComponent, IndexComponent];
