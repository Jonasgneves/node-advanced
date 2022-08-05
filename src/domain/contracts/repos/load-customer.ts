export interface SearchCustomer {
  load: (input: SearchCustomer.Input) => Promise<void>
}

namespace SearchCustomer {
  export type Input = { cpf: string }
}
