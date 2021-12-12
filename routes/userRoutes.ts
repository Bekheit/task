import express from 'express'
import {userController} from '../controllers/userController'

const router = express.Router()

router
  .route('/login')
  .post(userController.auth);

export default router;