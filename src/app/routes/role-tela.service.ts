import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { RoleTela } from '../interfaces/dto/roleTela';

@Injectable({
  providedIn: 'root',
})
export class RoleTelaService {
  constructor(private http: HttpClient) {}

  urlRoleTela = `${environment.api}/roleTela`;

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  create(roleTelaInput: any[]) {
    return this.http.post(`${this.urlRoleTela}/`, roleTelaInput, {
      headers: this.HttpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.urlRoleTela}/${id}`, {
      headers: this.HttpHeaders,
    });
  }
  getById(id: number) {
    return this.http.get(`${this.urlRoleTela}/` + id);
  }

  getAll() {
    return this.http.get(`${environment.api}/roleTela`);
  }

  getByRole(id: number) {
    return this.http.get(`${this.urlRoleTela}/role/${id}`);
  }
}
