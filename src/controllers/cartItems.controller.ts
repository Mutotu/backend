import { NextFunction, Request, Response } from 'express'
import CartItems from '../models/CartItems'

const CartItemsController = {

    async createCart(req: Request, res: Response, next: NextFunction) {
        try {
          const { quantity, extraDetail, cartItemId, productId, product } = req.body
          const cartItem = await CartItems.create( quantity, extraDetail, cartItemId, productId, product )
          res.status(201).json({ id: cartItem?.id, quantity: cartItem?.quantity, extraDetail: cartItem?.extraDetail, cartItemId: cartItem?.cartItemId, product: cartItem?.product, productId: cartItem?.productId })
        return
        } catch (e) {
          next(e)
        }
      },

    }


export default CartItemsController