import { NextFunction, Request, Response } from 'express'
import Cart from '../models/Cart'
import User from '../models/User'
import CartItems from '../models/CartItems'



const CartsController = {

  async addProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const userInfo = await User.findById(req.user!.userId)
      const foundUserId = userInfo?.carts?.find(id => id === req.user!.userId)
      if (!foundUserId) await Cart.createCart(req.user!.userId)

      const { quantity, extraDetail, productId, } = req.body
      const cart = await Cart.findLastCartByUserId(req.user!.userId)
      await CartItems.create(cart.id, productId, quantity, extraDetail)

      res.status(201).json(await Cart.findLastCartByUserId)
      return
    } catch (e) {
      next(e)
    }
  },


}

export default CartsController