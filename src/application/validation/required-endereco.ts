import { RequiredFieldError, RequiredObjectFieldError } from '@/application/errors'
import { EnderecoCidadao } from '@/application/controllers'

export class RequiredEnderecoValidator {
  constructor (
    private readonly value: EnderecoCidadao,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (typeof this.value !== 'object') return new RequiredObjectFieldError(this.fieldName)
    if (Array.isArray(this.value)) return new RequiredObjectFieldError(this.fieldName)
    if (this.value.ID_ENDERECO === undefined || this.value.ID_ENDERECO === '' || this.value.ID_ENDERECO === null) return new RequiredFieldError(`${this.fieldName}.ID_ENDERECO`)
    if (this.value.LOGRADOURO === undefined || this.value.LOGRADOURO === '' || this.value.LOGRADOURO === null) return new RequiredFieldError(`${this.fieldName}.LOGRADOURO`)
    if (this.value.NUMERO === undefined || this.value.NUMERO === '' || this.value.NUMERO === null) return new RequiredFieldError(`${this.fieldName}.NUMERO`)
    if (this.value.COMPLEMENTO === undefined || this.value.COMPLEMENTO === '' || this.value.COMPLEMENTO === null) return new RequiredFieldError(`${this.fieldName}.COMPLEMENTO`)
    if (this.value.CEP === undefined || this.value.CEP === '' || this.value.CEP === null) return new RequiredFieldError(`${this.fieldName}.CEP`)
    if (this.value.BAIRRO === undefined || this.value.BAIRRO === '' || this.value.BAIRRO === null) return new RequiredFieldError(`${this.fieldName}.BAIRRO`)
    if (this.value.CIDADE === undefined || this.value.CIDADE === '' || this.value.CIDADE === null) return new RequiredFieldError(`${this.fieldName}.CIDADE`)
    if (this.value.UF === undefined || this.value.UF === '' || this.value.UF === null) return new RequiredFieldError(`${this.fieldName}.UF`)
  }
}
