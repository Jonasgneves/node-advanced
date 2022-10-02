import { adaptExpressRoute } from '@/main/adapters'
import {
  makeSaveCitizenController as saveCitizen,
  makeSelectCitizenController as selectCitizen,
  makeLoadCitizensController as loadCitizens
  // makeSelectUserController as selectUser,
  // makeLoadUsersController as loadUsers
} from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/save_citizen', adaptExpressRoute(saveCitizen()))
  router.get('/select_citizen', adaptExpressRoute(selectCitizen()))
  router.get('/load_citizens', adaptExpressRoute(loadCitizens()))
  // router.get('/select_user/:ID_USUARIO?', adaptExpressRoute(selectUser()))
  // router.get('/load_users', adaptExpressRoute(loadUsers()))
}
