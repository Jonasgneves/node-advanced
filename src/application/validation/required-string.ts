import { RequiredFieldError } from '@/application/errors'

export class RequiredStringValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (this.value === undefined || this.value === '' || this.value === null) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
