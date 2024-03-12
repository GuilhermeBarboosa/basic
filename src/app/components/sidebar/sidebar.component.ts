import { Component, OnInit } from '@angular/core';
import { PermissionsGuardService } from 'src/app/guards/permissions-guard.service';
import { LoginService } from 'src/app/routes/login.service';
import { TelaService } from 'src/app/routes/tela.service';
import { roles } from 'src/roles';
import { TokenJwtService } from '../../services/token-jwt.service';
import { TelaObservableService } from 'src/app/observables/tela-observable.service';
import { provideRouter } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  role = '';
  rolesDefault = roles;
  isSidebarOpen: boolean = false;
  permissions: any = [];
  telasDefault: any = null;
  sideListOriginal: any;
  innerHTML = '';
  mobileQuery!: MediaQueryList;

  private _mobileQueryListener!: () => void;

  constructor(
    private token: TokenJwtService,
    private loginService: LoginService,
    private permissionService: PermissionsGuardService,
    private telaService: TelaObservableService,
    private mediaMatcher: MediaMatcher
  ) {
    this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      // console.log('Tamanho da tela mudou:', this.mobileQuery.matches);
    };
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  async ngOnInit() {
    this.role = await this.token.getRole();
    this.telasDefault = this.telaService.telasAll;

    if (this.role == this.rolesDefault.ROLE_ADMIN) {
      this.permissions = this.telaService.telaAdmin;
    } else {
      this.permissionService.permissionsVariables$.subscribe((res) => {
        this.permissions = res;
      });
    }

    await this.permissionService.verifyPermissions();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  openMenu() {
    let sidebar = document.querySelector('.sidebar');
    let closeBtn = document.querySelector('#btn');
    sidebar!.classList.toggle('open');
    this.menuBtnChange(sidebar, closeBtn);
  }

  menuBtnChange(
    sidebar: Element | null | undefined,
    closeBtn: Element | null | undefined
  ) {
    let logoName = document.querySelector('.logo_name');

    if (sidebar!.classList.contains('open')) {
      closeBtn!.classList.replace('bx-menu', 'bx-menu-alt-right');
      logoName!.classList.remove('hidden');
    } else {
      closeBtn!.classList.replace('bx-menu-alt-right', 'bx-menu');
      logoName!.classList.add('hidden');
    }
  }
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    let sideList = document.querySelector('#nav-list');

    var lis = sideList?.querySelectorAll('li');
    for (var i = 0; i < lis!.length; i++) {
      var name = lis![i].innerText.toLowerCase();
      if (name.includes(filterValue)) lis![i].style.display = 'list-item';
      else lis![i].style.display = 'none';
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  async logout() {
    this.loginService.logout();
  }
}
