import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginInput } from 'src/app/interfaces/input/loginInput';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

@Component({
  selector: 'app-mudar-senha',
  templateUrl: './mudar-senha.component.html',
  styleUrls: ['./mudar-senha.component.css'],
})
export class MudarSenhaComponent implements OnInit {
  token = this.activedRouter.snapshot.params['token'];
  loginForm!: FormGroup;
  email = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private activedRouter: ActivatedRoute,
    private jwtService: TokenJwtService
  ) {}

  ngOnInit() {
    if (this.jwtService.isTokenExpired(this.token)) {
      this.router.navigateByUrl('/expired-token')
    } else {
      let token = this.jwtService.getDecodedAccessToken(this.token);
      this.email = token.email;
      this.loginForm = this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      });
    }

  }

  submit() {
    if (this.loginForm.valid) {
      if (
        this.loginForm.get('password')?.value !=
        this.loginForm.get('passwordConfirm')?.value
      ) {
        this.notifier.showError('Senhas não conferem!');
        return;
      } else {
        let loginInput = new LoginInput(
          this.email,
          this.loginForm.get('password')?.value
        );

        this.userService.mudarSenha(loginInput).subscribe(
          (response: any) => {
            var login = JSON.parse(JSON.stringify(response));
            this.notifier.showSuccess('Senha atualizada com sucesso!');
            this.router.navigate(['/login-candidato/login']);
          },
          (error: any) => {
            this.notifier.showError('Erro no sistema!');
          }
        );
      }
    }
  }
}
