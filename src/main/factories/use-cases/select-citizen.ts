import { SelectCitizen, setupSelectCitizen } from '@/domain/use-cases'
import { makeCitizenRepository } from '@/main/factories/repos'

export const makeSelectCitizen = (): SelectCitizen => {
  return setupSelectCitizen(makeCitizenRepository())
}
