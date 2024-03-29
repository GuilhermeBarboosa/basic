import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared.module';
import { MudarSenhaComponent } from 'src/app/features/page-login/mudar-senha/mudar-senha.component';
import { MudarSenhaRoutes } from './mudar-senha.routing';
@NgModule({
  declarations: [MudarSenhaComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(MudarSenhaRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class MudarSenhaModule {}
