import { LoadCitizenController } from '@/application/controllers'
import { makeLoadCitizens } from '@/main/factories/use-cases'

export const makeLoadCitizensController = (): LoadCitizenController => {
  return new LoadCitizenController(makeLoadCitizens())
}
