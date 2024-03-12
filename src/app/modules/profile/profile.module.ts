import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared.module';
import { ProfileRoutes } from './profile.routing';
import { ProfileComponent } from 'src/app/features/page-login/profile/profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ProfileRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    ToastrModule.forRoot(),
  ],
})
export class ProfileModule {}
