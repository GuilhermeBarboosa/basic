import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsGuardService } from 'src/app/guards/permissions-guard.service';
import { Role } from 'src/app/interfaces/dto/role';
import { User } from 'src/app/interfaces/dto/user';
import { TelaService } from 'src/app/routes/tela.service';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TelaObservableService } from 'src/app/observables/tela-observable.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
import { roles } from 'src/roles';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css'],
})
export class InfoUserComponent implements OnInit {
  formulario!: FormGroup;
  user?: User;
  roles?: Role[];
  isDisabled = true;
  id = this.activedRouter.snapshot.params['id'];
  Editar = 'Editar';
  Voltar = 'Voltar';
  tipoPagina = 'CMS';
  role = '';

  telasDefault: any = null;
  rolesDefault = roles;
  permissions: any = [];

  constructor(
    private activedRouter: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private telaService: TelaObservableService,
    public permissionService: PermissionsGuardService,
    private token: TokenJwtService
  ) {}

  async ngOnInit() {
    this.role = await this.token.getRole();
    this.userService.getById(this.id).subscribe(
      (data) => {
        var userResponse = JSON.parse(JSON.stringify(data));
        this.user = userResponse;

        this.user!.created = this.utilsService.formatarData(this.user!.created);
        this.user!.updated = this.utilsService.formatarData(this.user!.updated);
        this.user!.data_de_nascimento = this.utilsService.formatarData(this.user!.data_de_nascimento);

        this.createTable();
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );

    if (this.role == this.rolesDefault.ROLE_ADMIN) {
      this.permissions = this.telaService.telaAdmin;
    } else {
      this.permissionService.permissionsVariables$.subscribe((res) => {
        this.permissions = res;
      });
    }

    await this.permissionService.verifyPermissions();
  }

  createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.user?.id, disabled: this.isDisabled }],
      name: [
        { value: this.user?.name, disabled: this.isDisabled },
        Validators.required,
      ],
      email: [
        { value: this.user?.email, disabled: this.isDisabled },
        Validators.required,
      ],
      role: [
        { value: this.user?.idRole, disabled: this.isDisabled },
        Validators.required,
      ],
      cpf: [
        { value: this.user?.cpf, disabled: this.isDisabled },
        Validators.required,
      ],
      data_de_nascimento: [
        { value: this.user?.data_de_nascimento, disabled: this.isDisabled },
        Validators.required,
      ],
      rua: [
        { value: this.user?.rua, disabled: this.isDisabled },
        Validators.required,
      ],
      cep: [
        { value: this.user?.cep, disabled: this.isDisabled },
        Validators.required,
      ],
      bairro: [
        { value: this.user?.bairro, disabled: this.isDisabled },
        Validators.required,
      ],
      cidade: [
        { value: this.user?.cidade, disabled: this.isDisabled },
        Validators.required,
      ],
      telefone: [
        { value: this.user?.telefone, disabled: this.isDisabled },
        Validators.required,
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
        [Validators.required],
      ],
      celular_responsavel: [
        { value: this.user?.celular_responsavel, disabled: this.isDisabled },
        [Validators.required],
      ],
      email_responsavel: [
        { value: this.user?.email_responsavel, disabled: this.isDisabled },
        [Validators.required],
      ],
      created: [
        { value: this.user?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.user?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  getEdit() {
    this.router.navigateByUrl(`user/edit/${this.id}`);
  }

  return() {
    this.router.navigateByUrl('/user');
  }

  remove() {
    this.userService.delete(this.id).subscribe(
      (data) => {
        this.notifier.showError('Usuário removido com sucesso!');
        this.router.navigateByUrl('/user');
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );
  }
}
