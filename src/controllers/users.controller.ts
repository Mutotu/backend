import { NextFunction, Request, Response } from 'express'
import User from '../models/User'
import { hashPassword, unhashPassword, createToken } from '../lib/helperFuncs'


const UsersController = {

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
          const { name, email, password, photo } = req.body
          if (email === undefined || password === undefined || name  === undefined) {
            throw new Error('Missing parameters: username or password or name')
          }
          const hashedPassword = hashPassword(password)
          const user = await User.create(name, email, hashedPassword, photo)
          res.status(201).json({ id: user.id, name: user.name, email: user.email, photo: user.photo })
        return
        } catch (e) {
          next(e)
        }
      },
    
      async getProductsInCart(req: Request, res: Response, next: NextFunction){
        try {
          const { id } = req.body
          const products = User.getProductsInCart(id)
          products.then(response => res.status(201).json(response))
          return
        } catch (error) {
          next(error)
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

      async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
          const { email, password } = req.body
          if (email === undefined || password === undefined) {
            throw new Error('Missing parameters: username or password')
          }
          const record = await User.findByEmail(email)
          const recordPass = record?.password
          if (!recordPass) {
            res.status(401).json({ error: 'Authentication error' })
            return
          }
          const auth = unhashPassword(password, recordPass)
          if (!auth) {
            res.status(401).json({ error: 'Authentication error' })
            return
          }
          const token = createToken(record?.id)
          const filteredRecord = {
            id: record?.id,
            name: record?.name,
            email: record?.email,
            photo: record?.photo,
            carts: record?.carts,
            token,
          }
          res.status(201).json(filteredRecord)
        } catch (error) {
          next(error)
        }
      },
    
}

export default UsersController