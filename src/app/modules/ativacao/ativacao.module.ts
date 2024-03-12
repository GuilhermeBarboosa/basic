import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared.module';
import { AtivacaoRoutes } from './ativacao.routing';
import { AtivacaoComponent } from 'src/app/features/page-login/ativacao/ativacao.component';

@NgModule({
  declarations: [
    AtivacaoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AtivacaoRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class AtivacaoModule {}
