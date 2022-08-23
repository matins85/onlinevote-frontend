import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPrivateSidenavComponent } from './app-private-sidenav.component';
import { PrivateDashboardComponent } from '../dashboard/private-dashboard/private-dashboard.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

const routes: Routes = [
  {
    path: '',
    component: AppPrivateSidenavComponent,
    children: [
      // Home
      { path: '', component: PrivateDashboardComponent },
      { path: 'home', component: PrivateDashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LoadingBarRouterModule],
  exports: [RouterModule],
})
export class AppPrivateSidenavRoutingModule {}
