import { Routes } from '@angular/router';
import { MudarSenhaComponent } from 'src/app/features/page-login/mudar-senha/mudar-senha.component';

export const MudarSenhaRoutes: Routes = [
  {
    path: ':token',
    component: MudarSenhaComponent,
  },

];
