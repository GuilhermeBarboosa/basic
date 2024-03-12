import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/routes/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenJwtService {
  constructor(private loginService: LoginService) {}

  setToken(login: any) {
    localStorage.setItem('token', login.token);
    localStorage.setItem('email', login.email);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.loginService.obterClaims().subscribe(
        (data: any) => {
          resolve(data.role);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getDecodedAccessToken(token: string): any {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken;
  }

  isTokenExpired(token: string): boolean {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }

  getIdRole(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.loginService.obterClaims().subscribe(
        (data: any) => {
          resolve(data.idRole);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getIdUser(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.loginService.obterClaims().subscribe(
        (data: any) => {
          resolve(data.id);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
