import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

@Component({
  selector: 'app-ativacao',
  templateUrl: './ativacao.component.html',
  styleUrls: ['./ativacao.component.css'],
})
export class AtivacaoComponent implements OnInit {
  token = this.activedRouter.snapshot.params['token'];
  emailResponse = '';

  constructor(
    private activedRouter: ActivatedRoute,
    private utilsService: UtilsService,
    private router: Router,
    private notifierService: NotifierService,
    private userService: UserService,
    private jwtService: TokenJwtService
  ) {}

  ngOnInit() {
    if(this.jwtService.isTokenExpired(this.token)){
      this.router.navigateByUrl('/expired-token')
    }else{
      this.ativarConta();
    }
  }

  ativarConta() {
    let token = this.jwtService.getDecodedAccessToken(this.token);
    this.emailResponse = token.email
    this.userService.ativarConta(token.email).subscribe(
      (res) => {
        const parsedData = JSON.parse(JSON.stringify(res));
        this.notifierService.showSuccess(parsedData.message);
      },
      (error: any) => {
        this.notifierService.showError(error.error);
      }
    );
  }
}
