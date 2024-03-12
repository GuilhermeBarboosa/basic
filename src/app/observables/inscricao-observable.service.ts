import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InscricaoInput } from '../interfaces/input/inscricaoInput';

@Injectable({
  providedIn: 'root'
})
export class InscricaoObservableService {

  constructor() { }

  private inscricaoInputSubject = new BehaviorSubject<InscricaoInput | null>(null);
  inscricaoInput$: Observable<InscricaoInput | null> = this.inscricaoInputSubject.asObservable();

  enviarInscricao(inscricaoInput: InscricaoInput) {
    this.inscricaoInputSubject.next(inscricaoInput);
  }
}
