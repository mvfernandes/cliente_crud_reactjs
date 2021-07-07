export class Cliente {
  created_at?: Date;
  updated_at?: Date;
  data_nascimento: string;
  id: number;
  nome: string;
  sexo: "masculino" | "feminino" | "";
  enderecos?: Endereco[] = [];
  constructor(params: Cliente) {
    this.created_at = params.created_at;
    this.updated_at = params.updated_at;
    this.data_nascimento = params.data_nascimento;
    this.id = params.id;
    this.nome = params.nome;
    this.sexo = params.sexo;
  }
}

export class Endereco {
  localId: string;
  id?: number;
  cliente_id?: number;
  tipo: "comercial" | "residencial" | "" = "residencial";
  cep: string;
  logradouro: string;
  UF: string;
  numero: string;
  complemento?: string;
  bairro?: string;
  constructor(params: Endereco) {
    this.localId = params.localId;
    this.id = params.id;
    this.cliente_id = params.cliente_id;
    this.tipo = params.tipo;
    this.cep = params.cep;
    this.logradouro = params.logradouro;
    this.UF = params.UF;
    this.numero = params.numero;
    this.complemento = params.complemento;
    this.bairro = params.bairro;
  }
}
