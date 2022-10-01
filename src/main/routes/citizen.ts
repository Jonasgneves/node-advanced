import { adaptExpressRoute } from '@/main/adapters'
import {
  makeSaveCitizenController as saveCitizen
  // makeSelectUserController as selectUser,
  // makeLoadUsersController as loadUsers
} from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/save_citizen', adaptExpressRoute(saveCitizen()))
  // router.get('/select_user/:ID_USUARIO?', adaptExpressRoute(selectUser()))
  // router.get('/load_users', adaptExpressRoute(loadUsers()))
}
