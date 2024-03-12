export class UserInput {
  name: string | undefined;

  email: string | undefined;

  password: string | undefined;

  role: number | undefined;

  //PARTE DE CANDADITOS
  cpf: string | undefined;

  data_de_nascimento: Date | undefined;

  rua: string | undefined;

  bairro: string | undefined;

  cep: string | undefined;

  cidade: string | undefined;

  telefone: string | undefined;

  numero: string | undefined;

  estado: string | undefined;

  complemento: string | undefined;

  nome_responsavel: string | undefined;

  email_responsavel: string | undefined;

  celular_responsavel: string | undefined;

  constructor(user: any) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;

    //PARTE DE CANDADITOS
    this.cpf = user.cpf;
    this.data_de_nascimento = user.data_de_nascimento;
    this.rua = user.rua;
    this.bairro = user.bairro;
    this.cep = user.cep;
    this.cidade = user.cidade;
    this.telefone = user.telefone;
    this.numero = user.numero;
    this.estado = user.estado;
    this.complemento = user.complemento;
    this.nome_responsavel = user.nome_responsavel;
    this.email_responsavel = user.email_responsavel;
    this.celular_responsavel = user.celular_responsavel;

  }
}
