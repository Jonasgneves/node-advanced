import { CitizenRepository } from '@/domain/contracts/repos'
import { ServerError } from '@/application/errors'

type Setup = (citizenRepository: CitizenRepository) => LoadCitizens
export type LoadCitizens = (pagination: number, quantity: number) => Promise<CitizenRepository.Output>

export const setupLoadCitizens: Setup = (citizenRepository) => async (pagination, quantity) => {
  const citizens = await citizenRepository.loadCitizens(pagination, quantity)
  if (citizens !== undefined) return citizens
  throw new ServerError()
}
