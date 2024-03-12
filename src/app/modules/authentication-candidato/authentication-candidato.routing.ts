import { Routes } from '@angular/router';
import { EsqueciASenhaComponent } from 'src/app/features/page-login/page-login-candidato/esqueci-a-senha/esqueci-a-senha.component';
import { LoginCandidatoComponent } from 'src/app/features/page-login/page-login-candidato/login-candidato/login-candidato.component';
import { RegisterCandidatoComponent } from 'src/app/features/page-login/page-login-candidato/register-candidato/register-candidato.component';

export const AuthenticationCandidatoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginCandidatoComponent,
      },

      {
        path: 'register',
        component: RegisterCandidatoComponent,

      },

      {
        path: 'forgot-password',
        component: EsqueciASenhaComponent,

      },
    ],

  },
];
