import { SaveCitizen, setupSaveCitizen } from '@/domain/use-cases'
import { makeCitizenRepository } from '@/main/factories/repos'

export const makeSaveCitizen = (): SaveCitizen => {
  return setupSaveCitizen(makeCitizenRepository())
}
