import CartItems from "./CartItems"
import prisma from '../lib/prisma'
import { Cart as PrismaCart, CartItem as PrismaCartItem } from "@prisma/client";


class Cart {
  constructor(
    public id: number,
    public userId: number,
    public cartItems?: Array<Partial<CartItems>>
  ) { }

  static async createCart(userId: number): Promise<PrismaCart & { cartItems: PrismaCartItem[] }> {
    const newCart = await prisma.cart.create({
      data: {
        user: {
          connect: { id: userId },
        }
      },
      include: {
        cartItems: {
          include: {
            product: true
          },
        },
      }
    });
    return newCart;
  }

  static async findLastCartByUserId(userId: number): Promise<Cart> {
    const cart = await prisma.cart.findFirstOrThrow({
      where: { userId },
      orderBy: { id: "desc" }
    })
    return cart
  }

  static async getAllCartDetails(userId: number): Promise<Cart & { total: number }> {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      orderBy: { id: "desc" },
      include: {
        cartItems: {
          include: {
            product: true
          },
        }
      }
    })
    if (!cart) {
      const newCart = await Cart.createCart(userId)
      return { ...newCart, total: 0 }
    }
    const total = cart.cartItems.reduce((acc, curValue) => {
      acc += parseFloat(curValue.product.price) * curValue.quantity
      return acc
    }, 0)
    return { ...cart, total }


  }
}

export default Cart