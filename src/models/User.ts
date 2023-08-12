import prisma from '../lib/prisma'
// import CartItems from './CartItems';
import Cart from "./Cart"
// import Product from './Product';
// import CartItems from './CartItems'

class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    readonly password?: string,
    public photo?: string,
    public carts?: Array<Partial<Cart>>
  ) { }

  static async create(name: string, email: string, password: string, photo: string) {
    const { id } = await prisma.users.create({
      data: {
        name,
        email,
        password,
        photo,
      }
    })
    return new User(id, name, email, password, photo)
  }
  static async findById(id: number): Promise<User | null> {
    const record = await prisma.users.findUnique({
      where: { id },
      include: {
        carts: {
          include: {
            cartItems: {
              include: {
                product: true,
              },
            }
          }
        }
      }
    });
    if (record === null) {
      throw new Error('User does not exist.')
    }
    const { name, email, photo, carts } = record
    return new User(id, name, email, undefined, photo, carts)
  }
  static async getProductsInCart(id: number) {
    const cartItems = await prisma.cart.findMany({
      where: { userId: id },
      include: {
        cartItems: true
      }
    }
    )
    const cartsWithData: Array<Cart> = cartItems.map(cart => {
      const cartItemsData = cart.cartItems.map(cartItem => {

        return {
          id: cartItem.id,
          quantity: cartItem.quantity,
          extraDetail: cartItem.extraDetail,
          cartItemId: cartItem.cartId,
        }
      });
      return new Cart(cart.id, cart.userId, cartItemsData);
    });

    return cartsWithData;

  }

  static async findByEmail(email: string): Promise<User | null> {
    const record = await prisma.users.findUnique({
      where: { email },
      include: {
        carts: true
      },
    })
    if (record === null) {
      throw new Error('User does not exist.')
    }
    const { id, name, password, photo, carts } = record
    return new User(id, name, email, password, photo, carts)
  }
}

export default User
