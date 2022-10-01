import { SaveCitizenController } from '@/application/controllers'
import { makeSaveCitizen } from '@/main/factories/use-cases'

export const makeSaveCitizenController = (): SaveCitizenController => {
  return new SaveCitizenController(makeSaveCitizen())
}
