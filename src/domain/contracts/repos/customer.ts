export interface CustomerRepository {
  load: (input: SearchCustomer.Input) => Promise<SearchCustomer.Output>
  save: (input: SaveCustomer.Input) => Promise<SaveCustomer.Output>
}

export namespace SearchCustomer {
  export type Input = { cpf: string }

  export type Output = undefined | {
    nome: string
    cpf: string
    identidade: string
    orgao_emissor: string
    grau_de_parentesco: string
    telefone01: string
    telefone02: string
    endereco: string
    numero: string
    complemento: string
    cep: string
    bairro: string
    cidade: string
    uf: string
    email: string
  }
}
export namespace SaveCustomer {
  export type Output = undefined | {
    nome: string
    cpf: string
    identidade: string
    orgao_emissor: string
    grau_de_parentesco: string
    telefone01: string
    telefone02: string
    endereco: string
    numero: string
    complemento: string
    cep: string
    bairro: string
    cidade: string
    uf: string
    email: string
  }

  export type Input = {
    nome: string
    cpf: string
    identidade: string
    orgao_emissor: string
    grau_de_parentesco: string
    telefone01: string
    telefone02: string
    endereco: string
    numero: string
    complemento: string
    cep: string
    bairro: string
    cidade: string
    uf: string
    email: string
  }
}
