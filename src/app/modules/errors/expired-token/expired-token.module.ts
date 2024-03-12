import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { ExpiredTokenComponent } from 'src/app/errors/expired-token/expired-token.component';
import { ExpiredTokenRoutes } from './expired-token.routing';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
   ExpiredTokenComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ExpiredTokenRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class ExpiredTokenModule {}
