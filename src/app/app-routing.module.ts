import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './guards/login-guard.service';

export const routes: Routes = [
  {
    path: 'cms',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
    canActivate: [LoginGuardService],
  },
  {
    path: 'ativacao',
    loadChildren: () =>
      import('./modules/ativacao/ativacao.module').then(
        (m) => m.AtivacaoModule
      ),
  },
  {
    path: 'mudar-senha',
    loadChildren: () =>
      import('./modules/mudar-senha/mudar-senha.module').then(
        (m) => m.MudarSenhaModule
      ),
  },
  {
    path: 'expired-token',
    loadChildren: () =>
      import('./modules/errors/expired-token/expired-token.module').then(
        (m) => m.ExpiredTokenModule
      ),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./modules/errors/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: 'login-candidato',
    loadChildren: () =>
      import(
        './modules/authentication-candidato/authentication-candidato.module'
      ).then((m) => m.AuthenticationCandidatoModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [LoginGuardService],
  },
  {
    path: 'role',
    loadChildren: () =>
      import('./modules/role/role.module').then((m) => m.RoleModule),
    canActivate: [LoginGuardService],
  },
  {
    path: 'politica',
    loadChildren: () =>
      import('./modules/politica/politica.module').then(
        (m) => m.PoliticaModule
      ),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
    canActivate: [LoginGuardService],
  },
  {
    path: 'minha-conta',
    loadChildren: () =>
      import('./modules/minha-conta/minha-conta.module').then(
        (m) => m.MinhaContaModule
      ),
    canActivate: [LoginGuardService],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [LoginGuardService],
  },

  {
    path: '',
    redirectTo: 'login-candidato/login',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/not-found' } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  // routeIdentifier: string | undefined;

  // constructor(private routeIdentifierService: RouteInfoService) {
  //   routes.forEach((route: any) => {
  //     if (route.data && route.data.route_identifier) {
  //       this.routeIdentifierService.setRouteIdentifier(
  //         route.path || '',
  //         route.data.route_identifier
  //       );
  //     }
  //   });
  // }
}
