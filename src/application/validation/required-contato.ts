import { RequiredFieldError, RequiredObjectFieldError } from '@/application/errors'
import { ContatoCidadao } from '@/application/controllers'

export class RequiredContatoValidator {
  constructor (
    private readonly value: ContatoCidadao,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (typeof this.value !== 'object') return new RequiredObjectFieldError(this.fieldName)
    if (Array.isArray(this.value)) return new RequiredObjectFieldError(this.fieldName)
    if (this.value.ID_CONTATO === undefined || this.value.ID_CONTATO === '' || this.value.ID_CONTATO === null) return new RequiredFieldError(`${this.fieldName}.ID_CONTATO`)
    if (this.value.TELEFONE === undefined || this.value.TELEFONE === '' || this.value.TELEFONE === null) return new RequiredFieldError(`${this.fieldName}.TELEFONE`)
    if (this.value.CELULAR === undefined || this.value.CELULAR === '' || this.value.CELULAR === null) return new RequiredFieldError(`${this.fieldName}.CELULAR`)
    if (this.value.EMAIL === undefined || this.value.EMAIL === '' || this.value.EMAIL === null) return new RequiredFieldError(`${this.fieldName}.EMAIL`)
  }
}
