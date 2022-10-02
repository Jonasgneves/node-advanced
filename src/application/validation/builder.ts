import {
  RequiredStringValidator,
  Validator,
  RequiredEnderecoValidator,
  RequiredContatoValidator
} from '@/application/validation'

export class ValidationBuilder {
  private constructor (
    private readonly value: any,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: { value: any, fieldName: string }): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(this.value, this.fieldName))
    return this
  }

  enderecoRequired (): ValidationBuilder {
    this.validators.push(new RequiredEnderecoValidator(this.value, this.fieldName))
    return this
  }

  contatoRequired (): ValidationBuilder {
    this.validators.push(new RequiredContatoValidator(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
