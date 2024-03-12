import { Injectable } from '@angular/core';
import { TelaService } from '../routes/tela.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelaObservableService {

  constructor(private telaService: TelaService) { }

  telasVariablesSubject = new BehaviorSubject<any[]>([]);
  telasVariables$ = this.telasVariablesSubject.asObservable();
  telasAll: { [key: string]: string } = {};
  telaAdmin: any = null

  initTelas() {
    this.telaService.getAll().subscribe(
      (data: any) => {
        const response = JSON.parse(JSON.stringify(data));
        const telasVariables: any = [];
        this.telaAdmin = response;
        response.forEach((element: any) => {
          const key = element.identificador.toUpperCase().replaceAll('-', '_');
          this.telasAll[key] = element.identificador;
          telasVariables.push(element);
        });

        this.telasVariablesSubject.next(telasVariables);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
