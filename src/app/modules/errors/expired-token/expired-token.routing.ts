import { Routes } from '@angular/router';
import { ExpiredTokenComponent } from 'src/app/errors/expired-token/expired-token.component';
import { AtivacaoComponent } from 'src/app/features/page-login/ativacao/ativacao.component';

export const ExpiredTokenRoutes: Routes = [
  {
    path: '',
    component: ExpiredTokenComponent,
  },

];
