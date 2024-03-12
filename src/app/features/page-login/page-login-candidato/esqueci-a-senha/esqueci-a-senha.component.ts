import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInput } from 'src/app/interfaces/input/loginInput';
import { LoginService } from 'src/app/routes/login.service';
import { UserService } from 'src/app/routes/user.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
@Component({
  selector: 'app-esqueci-a-senha',
  templateUrl: './esqueci-a-senha.component.html',
  styleUrls: ['./esqueci-a-senha.component.css']
})
export class EsqueciASenhaComponent  implements OnInit{
  constructor(
    private userService: UserService,
    private tokenJwtService: TokenJwtService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private loadService: LoadingService
  ) {}

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['guilherme.strg@gmail.com', Validators.required],
    });

  }

  submit() {
    if (this.loginForm.valid) {

      this.loadService.show();
      this.userService.recuperacaoDeSenha(this.loginForm.value.email).subscribe(
        (response: any) => {
          this.loadService.hide();
          var login = JSON.parse(JSON.stringify(response));
          this.notifier.showSuccess('Email enviado com sucesso!');
        },
        (error: any) => {
          this.loadService.hide();
          this.notifier.showError('Erro no sistema');
        }
      );
    }
  }

}
