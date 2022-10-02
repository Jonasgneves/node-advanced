import { LoadCitizens, setupLoadCitizens } from '@/domain/use-cases'
import { makeCitizenRepository } from '@/main/factories/repos'

export const makeLoadCitizens = (): LoadCitizens => {
  return setupLoadCitizens(makeCitizenRepository())
}
