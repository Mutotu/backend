import { NextFunction, Request, Response } from 'express'
import User from '../models/User'
import { hashPassword } from '../lib/helperFuncs'

const UsersController = {

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
          const { name, email, password } = req.body
          if (email === undefined || password === undefined || name  === undefined) {
            throw new Error('Missing parameters: username or password or name')
          }
          const hashedPassword = hashPassword(password)
          const user = await User.create(name, email, hashedPassword)
          res.status(201).json({ id: user.id, name: user.name, email: user.email })
        return
        } catch (e) {
          next(e)
        }
      },

      async loginMe(req: Request, res: Response) {
        try {
          const userId = (req as any).user.userId
          const foundUser = await User.findById(userId)
          if (foundUser) {
            return res.status(201).json(foundUser)
          }
          return res.status(401).json('401 Unauthorized')
        } catch (error) {
          return res.status(401).json({ error })
        }
      },
}

export default UsersController