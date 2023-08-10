import { NextFunction, Request, Response } from 'express'
import Carts from '../models/Carts'



const UsersController = {

    async createCart(req: Request, res: Response, next: NextFunction) {
        try {
          const { userId} = req.body
        //   if (email === undefined || password === undefined || name  === undefined) {
        //     throw new Error('Missing parameters: username or password or name')
        //   }

          const cart = await Carts.create(userId)
          console.log(cart)
          res.status(201).json({ id: cart?.userId, carts: cart?.carts  })
        return
        } catch (e) {
          next(e)
        }
      },
    }

    export default UsersController