import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { DashboardComponent } from './dashboard';
import { ProfileComponent } from './profile';

import { AuthGuard } from './guard/auth-guard.service';

import { DataResolver } from './app.resolver';
import { ProfileResolver } from './profile/profile.resolver';
import { EventResolver } from './resolvers/event.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule', canActivate: [AuthGuard]},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],
    resolve: { profile: ProfileResolver } },
  // { path: 'event-edit/:id', component: EventEditComponent, canActivate: [AuthGuard],
  //   resolve: { event: EventResolver } },
  { path: 'event-edit', loadChildren: './event-edit#EventEditModule', canActivate: [AuthGuard] },
  { path: 'events', loadChildren: './events#EventsModule', canActivate: [AuthGuard] },
  { path: 'search', loadChildren: './+search#SearchModule', canActivate: [AuthGuard] },
  { path: '**',    component: NoContentComponent },
];
