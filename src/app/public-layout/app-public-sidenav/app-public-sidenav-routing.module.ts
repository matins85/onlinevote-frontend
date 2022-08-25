import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard-component/dashboard/dashboard.component';
import { AppPublicSidenavComponent } from './app-public-sidenav.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { CaptureComponent } from '../capture/capture.component';
import { SignupComponent } from '../signup/signup.component';
import { VoteComponent } from '../vote/vote.component';
import { Vote2Component } from '../vote2/vote2.component';

const routes: Routes = [
  {
    path: '',
    component: AppPublicSidenavComponent,
    children: [
      // home
      { path: '', component: DashboardComponent },
      // home
      { path: 'home', component: DashboardComponent },
      // capture
      { path: 'capture', component: CaptureComponent },
      // signup
      { path: 'signup', component: SignupComponent },
      // vote
      { path: 'vote', component: VoteComponent },
      // cast-vote
      { path: 'cast-vote', component: Vote2Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LoadingBarRouterModule],
  exports: [RouterModule],
})
export class AppPublicSidenavRoutingModule {}
