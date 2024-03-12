import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoleTelaObservableService } from './observables/role-tela-observable.service';
import { TelaObservableService } from './observables/tela-observable.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  // providers: [StyleService],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private roleTelaObservableService : RoleTelaObservableService, private telaObservableService: TelaObservableService) {
    this.roleTelaObservableService.initRoleTela();
    this.telaObservableService.initTelas();
  }
}
