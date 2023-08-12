import Carts from "./Cart";
import Product from "./Product";
import prisma from '../lib/prisma'

class CartItems {
  constructor(
    public id: number,
    public quantity: number,
    public extraDetail: string,
    public cartItemId: number,
    public cart?: Partial<Carts>,
    public productId?: number | null,
    public product?: Partial<Product>
  ) { }

  static async create(cartItemId: number, productId: number, quantity: number, extraDetail: string): Promise<CartItems | null> {
    const { id, product } = await prisma.cartItem.create({
      data: {
        quantity,
        extraDetail,
        cart: {
          connect: { id: cartItemId }
        },
        product: {
          connect: { id: productId },
        }
      },
      include: {
        product: true
      }
    })
    return new CartItems(id, quantity, extraDetail, cartItemId, undefined, productId, product || undefined)
  }
}

export default CartItems;