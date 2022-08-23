import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { IsLoggedInGuard } from './guards/IsloggedIn.guards';
// import { LoginGuard } from './guards/login.guards';
// import { SignupGuard } from './guards/signup.guards';
import { NetworkAwarePreloadingStrategyService2Service } from './services/network-aware-preloading-strategy.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './public-layout/app-public-sidenav/app-public-sidenav.module'
      ).then((m) => m.AppPublicSidenavModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/app-private-sidenav/app-private-sidenav.module').then(
        (m) => m.AppPrivateSidenavModule
      ),
    // canActivate: [DashboardGuard],
    // canLoad: [IsLoggedInGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NetworkAwarePreloadingStrategyService2Service,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
