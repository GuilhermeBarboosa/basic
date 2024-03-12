import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environment';
import { UserInput } from '../interfaces/input/userInput';
import { LoginInput } from '../interfaces/input/loginInput';
@Injectable({
  providedIn: 'root',
})
export class UserService {


  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlUser = `${environment.api}/user`;
  urlAuth = `${environment.api}/auth`;

  getById(id: number) {
    return this.http.get(`${this.urlUser}/` + id, {
      headers: this.HttpHeaders,
    });
  }

  ativarConta(email: string) {
    return this.http.post(`${this.urlAuth}/ativarConta/${email}`, {
      headers: this.HttpHeaders,
    });
  }

  findCpf(cpf: string) {
    return this.http.get(`${this.urlUser}/cpf/` + cpf, {
      headers: this.HttpHeaders,
    });
  }

  mudarSenha(login: LoginInput) {
    return this.http.post(`${this.urlUser}/mudarSenha/`, login, {
      headers: this.HttpHeaders,
    });
  }

  create(user: UserInput) {
    return this.http.post(`${this.urlUser}`, user, {
      headers: this.HttpHeaders,
    });
  }

  createCandidato(user: UserInput) {
    return this.http.post(`${this.urlUser}/candidato`, user, {
      headers: this.HttpHeaders,
    });
  }

  recuperacaoDeSenha(email: any) {
    return this.http.post(`${this.urlAuth}/recuperarSenha/${email}`, {
      headers: this.HttpHeaders,
    });
  }

  getAll() {
    return this.http.get(`${this.urlUser}`, { headers: this.HttpHeaders });
  }

  getAllInativo() {
    return this.http.get(`${this.urlUser}/desativado`, {
      headers: this.HttpHeaders,
    });
  }

  edit(user: UserInput, id: number | undefined) {
    return this.http.put(`${this.urlUser}/${id}`, user, {
      headers: this.HttpHeaders,
    });
  }

  ativar(user: UserInput, id: number) {
    return this.http.put(`${this.urlUser}/ativar/${id}`, user, {
      headers: this.HttpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.urlUser}/${id}`, {
      headers: this.HttpHeaders,
    });
  }
}
