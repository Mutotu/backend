import { NextFunction, Request, Response } from 'express'
import CartItems from '../models/CartItems'
import Carts from '../models/Cart'

const CartItemsController = {

  async createCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { quantity, extraDetail, cartItemId, productId } = req.body
      await CartItems.create(quantity, extraDetail, cartItemId, productId)
      res.status(201).json(await Carts.getAllCartDetails(req.user!.userId))
      return
    } catch (e) {
      next(e)
    }
  },

}


export default CartItemsController