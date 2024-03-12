import { Routes } from '@angular/router';
import { AtivacaoComponent } from 'src/app/features/page-login/ativacao/ativacao.component';

export const AtivacaoRoutes: Routes = [
  {
    path: ':token',
    component: AtivacaoComponent,
  },

];
