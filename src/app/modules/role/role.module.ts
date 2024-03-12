import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { CreateRoleComponent } from 'src/app/features/roles/create-role/create-role.component';
import { EditRoleComponent } from 'src/app/features/roles/edit-role/edit-role.component';
import { InfoRoleComponent } from 'src/app/features/roles/info-role/info-role.component';
import { RolesTableComponent } from 'src/app/features/roles/roles-table/roles-table.component';
import { CreatePermissaoComponent } from 'src/app/features/roles/telas/create-permissao/create-permissao.component';
import { TableTelasComponent } from 'src/app/features/roles/telas/table-telas/table-telas.component';
import { SharedModule } from '../shared.module';
import { RoleRoutes } from './role.routing';
@NgModule({
  declarations: [
    RolesTableComponent,
    CreateRoleComponent,
    InfoRoleComponent,
    EditRoleComponent,
    TableTelasComponent,
    CreatePermissaoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(RoleRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class RoleModule {}
