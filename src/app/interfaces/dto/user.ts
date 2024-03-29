import { DefaultDto } from './defaultDto';
import { Role } from './role';

export interface User extends DefaultDto {
  name: string;
  email: string;
  password: string;
  idRole: number;
  role: string;
  //PARTE DE CANDADITOS
  cpf: string;

  data_de_nascimento: string;

  rua: string;

  bairro: string;

  cep: string;

  cidade: string;

  telefone: string;

  numero: string;

  estado: string;

  complemento: string;

  nome_responsavel: string;

  email_responsavel: string;

  celular_responsavel: string;
}
