import express from 'express'
import UsersController from './controllers/users.controller'
import auth from './middlewares/auth'


const router = express.Router()

router.post('/users', UsersController.createUser)
router.get('/me', auth, UsersController.loginMe)
router.get('/login', UsersController.loginUser)

export default router
