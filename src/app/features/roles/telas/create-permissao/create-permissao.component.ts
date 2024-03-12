import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permissao } from 'src/app/interfaces/dto/permissao';
import { RoleTela } from 'src/app/interfaces/dto/roleTela';
import { PermissaoService } from 'src/app/routes/permissao.service';
import { RoleTelaService } from 'src/app/routes/role-tela.service';
import { TelaService } from 'src/app/routes/tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Tela } from '../../../../interfaces/dto/tela';

@Component({
  selector: 'app-create-permissao',
  templateUrl: './create-permissao.component.html',
  styleUrls: ['./create-permissao.component.css'],
})
export class CreatePermissaoComponent implements OnInit {
  tela!: Tela[];
  permissao!: Permissao[];
  formulario!: any;
  Sim = 'Sim';
  Nao = 'Não';
  tipoPagina = 'CMS';
  id = this.activedRouter.snapshot.params['id'];

  constructor(
    private router: Router,
    private activedRouter: ActivatedRoute,
    private roleTelaService: RoleTelaService,
    private telaService: TelaService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private utilsService: UtilsService,
    private permissaoService: PermissaoService,
    private token: TokenJwtService
  ) {}

  async ngOnInit() {
    await this.telaService.getAll().subscribe(
      (data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.tela = roleResponse;
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );

    this.permissaoService.getAll().subscribe((res) => {
      var permissaoResponse = JSON.parse(JSON.stringify(res));
      this.permissao = permissaoResponse;
    });

    await this.roleTelaService.getByRole(this.id).subscribe((res) => {
      var roleResponse = JSON.parse(JSON.stringify(res));
      roleResponse.forEach((element: RoleTela) => {
        this.createRoleExist(element);

        const selector = `[id='${element.idTela}']`;
        const inputElement = document.querySelector(selector);

        if (inputElement) {
          inputElement.setAttribute('checked', 'true');
        }
      });
    });

    this.createTable();
  }

  async createTable() {
    this.formulario = this.formBuilder.array([]);
  }

  createInput(tela: Tela) {
    this.isCheckboxChecked(tela);

    const existingIndex = this.formulario.controls.findIndex(
      (control: any) => control.value.tela === tela.id
    );

    if (existingIndex !== -1) {
      this.formulario.controls[existingIndex].patchValue({
        checked: !this.formulario.controls[existingIndex].value.checked,
      });

      if (!this.formulario.controls[existingIndex].value.checked) {
        const elements = this.getElements(tela.id);

        const labels = this.getLabels(tela.id);

        elements.forEach((element) => {
          const inputElement = element as HTMLInputElement;

          if (inputElement) {
            inputElement.disabled = false;
            inputElement.checked = false;
          }
        });

        labels.forEach((element) => {
          const inputElement = element as HTMLLabelElement;
          if (inputElement) {
            inputElement.style.color = 'gray';
          }
        });

        this.formulario.removeAt(existingIndex);
      }
    } else {
      let permissao = 1;

      const roleTelaGroup = this.formBuilder.group({
        role: this.id,
        tela: tela.id,
        checked: true,
        permissao: permissao,
      });

      this.formulario.push(roleTelaGroup);
    }
  }

  createPermission(tela: Tela, permissao: Permissao) {
    const existingIndex = this.formulario.controls.findIndex(
      (control: any) => control.value.tela === tela.id
    );

    this.formulario.controls[existingIndex].patchValue({
      permissao: permissao.id,
    });
  }

  isCheckboxChecked(t: any): boolean {
    const elements = this.getElements(t.id);
    const labels = this.getLabels(t.id);
    elements.forEach((element, index) => {
      const inputElement = element as HTMLInputElement;

      if (index == 0 && inputElement) {
        inputElement.checked = true;
      }
      if (inputElement) {
        inputElement.disabled = false;
      }
    });

    labels.forEach((element) => {
      const inputElement = element as HTMLLabelElement;
      if (inputElement) {
        inputElement.style.color = 'black';
      }
    });

    return true;
  }

  createRoleExist(element: RoleTela) {
    this.isCheckboxChecked(element.idTela);
    this.checkedInitCheckbox(element.idPermissao, element.idTela);
    const roleTelaGroup = this.formBuilder.group({
      role: element.idRole,
      tela: element.idTela,
      checked: true,
      permissao: element.idPermissao,
    });

    this.formulario.push(roleTelaGroup);
  }

  checkedInitCheckbox(idPermissao: number, idTela: number) {
    const elements = this.getElements(idTela);

    const labels = this.getLabels(idTela);

    elements.forEach((element) => {
      const inputElement = element as HTMLInputElement;

      if (inputElement) {
        inputElement.disabled = false;
      }

      if (inputElement.value == idPermissao.toString()) {
        inputElement.checked = true;
      }
    });

    labels.forEach((element) => {
      const inputElement = element as HTMLLabelElement;
      if (inputElement) {
        inputElement.style.color = 'black';
      }
    });
  }

  getElements(id: number | any) {
    return document.querySelectorAll(`input[id="permissao_${id}"]`);
  }

  getLabels(id: number | any) {
    return document.querySelectorAll(`label[id="label_permissao_${id}"]`);
  }

  save() {
    if (this.formulario.valid) {
      this.roleTelaService.create(this.formulario.value).subscribe(
        (data) => {
          this.notifier.showSuccess('Permissões cadastrada com sucesso!');
          this.router.navigateByUrl(`/role/telas/${this.id}`);
        },
        (error) => {
          this.notifier.showError(error.error);
        }
      );
    } else {
      this.utilsService.getFormValidationErrors(this.formulario);
    }
  }

  return() {
    this.router.navigateByUrl(`/role/telas/${this.id}`);
  }
}
