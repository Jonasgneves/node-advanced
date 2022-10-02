import { SelectCitizenController } from '@/application/controllers'
import { makeSelectCitizen } from '@/main/factories/use-cases'

export const makeSelectCitizenController = (): SelectCitizenController => {
  return new SelectCitizenController(makeSelectCitizen())
}
