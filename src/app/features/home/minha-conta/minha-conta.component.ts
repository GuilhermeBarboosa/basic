import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/dto/role';
import { User } from 'src/app/interfaces/dto/user';
import { UserInput } from 'src/app/interfaces/input/userInput';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.css'],
})
export class MinhaContaComponent implements OnInit {
  formulario!: FormGroup;
  id: any;
  user?: User;
  roles?: Role[];
  isDisabled = false;
  Editar = 'Editar';
  Voltar = 'Voltar';
  role = '';
  years = 0;
  validResponsavel = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private token: TokenJwtService
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();
    this.id = await this.token.getIdUser();

    this.userService.getById(this.id).subscribe(
      (data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        this.user = userResponse;

        this.years = moment().diff(this.user?.data_de_nascimento, 'years');

        if(this.years < 18){
          this.validResponsavel = true;
        }

        this.user!.data_de_nascimento = this.utilsService.formatarData(
          this.user?.data_de_nascimento
        );

        this.createTable();
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }

  createTable() {
    this.formulario = this.formBuilder.group({
      name: [
        { value: this.user?.name, disabled: this.isDisabled },
        Validators.required,
      ],
      email: [
        { value: this.user?.email, disabled: this.isDisabled },
        [Validators.required],
      ],
      telefone: [
        { value: this.user?.telefone, disabled: this.isDisabled },
        [Validators.required],
      ],
      cep: [
        { value: this.user?.cpf, disabled: this.isDisabled },
        [Validators.required],
      ],
      rua: [
        { value: this.user?.rua, disabled: this.isDisabled },
        [Validators.required],
      ],
      data_de_nascimento: [
        { value: this.user?.data_de_nascimento, disabled: this.isDisabled },
        [Validators.required],
      ],
      cidade: [
        { value: this.user?.cidade, disabled: this.isDisabled },
        [Validators.required],
      ],
      bairro: [
        { value: this.user?.bairro, disabled: this.isDisabled },
        [Validators.required],
      ],
      cpf: [
        { value: this.user?.cpf, disabled: this.isDisabled },
        [Validators.required],
      ],
      estado: [
        { value: this.user?.estado, disabled: this.isDisabled },
        [Validators.required],
      ],
      numero: [
        { value: this.user?.numero, disabled: this.isDisabled },
        [Validators.required],
      ],
      complemento: [
        { value: this.user?.complemento, disabled: this.isDisabled },
        [],
      ],
      nome_responsavel: [
        { value: this.user?.nome_responsavel, disabled: this.isDisabled },
        [this.validResponsavel ? Validators.required : Validators.nullValidator],
      ],
      celular_responsavel: [
        { value: this.user?.celular_responsavel, disabled: this.isDisabled },
        [this.validResponsavel ? Validators.required : Validators.nullValidator],
      ],
      email_responsavel: [
        { value: this.user?.email_responsavel, disabled: this.isDisabled },
        [this.validResponsavel ? Validators.required : Validators.nullValidator],
      ],
    });
  }

  updateUser() {
    this.utilsService.getFormValidationErrors(this.formulario);
    if (this.formulario.valid) {
      let userDTO = {
        name: this.formulario.get('name')?.value,
        cpf: this.formulario.get('cpf')?.value,
        email: this.formulario.get('email')?.value,
        telefone: this.formulario.get('telefone')?.value,
        data_de_nascimento: this.utilsService.formatarDataToSQL(
          this.formulario.get('data_de_nascimento')?.value
        ),
        cep: this.formulario.get('cep')?.value,
        rua: this.formulario.get('rua')?.value,
        cidade: this.formulario.get('cidade')?.value,
        bairro: this.formulario.get('bairro')?.value,
        numero: this.formulario.get('numero')?.value,
        estado: this.formulario.get('estado')?.value,
        complemento: this.formulario.get('complemento')?.value,
        nome_responsavel: this.formulario.get('nome_responsavel')?.value,
        email_responsavel: this.formulario.get('email_responsavel')?.value,
        celular_responsavel: this.formulario.get('celular_responsavel')?.value,
        role: this.user?.idRole,
        password: this.user?.password,
      };

      let userInput = new UserInput(userDTO);
      this.userService.edit(userInput, this.user!.id).subscribe(
        (data) => {
          this.notifier.showSuccess('Usuário atualizado com sucesso!');

          this.router.navigateByUrl('/inicio');
        },
        (error) => {
          this.notifier.showError(error.error);
        }
      );
    } else {
      this.notifier.showError('Preencha todos os campos obrigatórios!');
    }
  }
}
