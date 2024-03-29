import { Routes } from '@angular/router';
import { CreateRoleComponent } from 'src/app/features/roles/create-role/create-role.component';
import { EditRoleComponent } from 'src/app/features/roles/edit-role/edit-role.component';
import { InfoRoleComponent } from 'src/app/features/roles/info-role/info-role.component';
import { RolesTableComponent } from 'src/app/features/roles/roles-table/roles-table.component';
import { CreatePermissaoComponent } from 'src/app/features/roles/telas/create-permissao/create-permissao.component';
import { TableTelasComponent } from 'src/app/features/roles/telas/table-telas/table-telas.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { RouteData } from 'src/app/interfaces/input/roteData';

export const RoleRoutes: Routes = [
  {
    path: '',
    component: RolesTableComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'role',
    } as RouteData,
  },
  {
    path: 'register',
    component: CreateRoleComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'role',
    } as RouteData,
  },
  {
    path: 'info/:id',
    component: InfoRoleComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'role',
    } as RouteData,
  },
  {
    path: 'edit/:id',
    component: EditRoleComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'role',
    } as RouteData,
  },
  {
    path: 'telas/:id',
    component: TableTelasComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'role',
    } as RouteData,
  },
  {
    path: 'telas/:id/register',
    component: CreatePermissaoComponent,
    canActivate: [AuthGuardService],
    data: {
      route_identifier: 'role',
    } as RouteData,
  },


];
