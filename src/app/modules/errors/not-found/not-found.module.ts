import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../../shared.module';
import { NotFoundComponent } from 'src/app/errors/not-found/not-found.component';
import { NotFoundRoutes } from './not-found.routing';

@NgModule({
  declarations: [
   NotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(NotFoundRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class NotFoundModule {}
