import { Injectable } from '@angular/core';
import { RoleTelaService } from '../routes/role-tela.service';
import { RoleTela } from '../interfaces/dto/roleTela';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleTelaObservableService {

  constructor(private roleTelaService: RoleTelaService) { }

  roleTela: RoleTela[] | null = null;
  private roleTelaSubject = new BehaviorSubject<RoleTela[] | null>(null);
  roleTela$: Observable<RoleTela[] | null> =
    this.roleTelaSubject.asObservable();

  initRoleTela() {
    this.roleTelaService.getAll().subscribe((data: any) => {
      const roleTelaArray: RoleTela[] = JSON.parse(JSON.stringify(data));
      this.roleTelaSubject.next(roleTelaArray);
      this.roleTela = roleTelaArray;
    });
  }
}
