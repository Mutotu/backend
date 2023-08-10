import prisma from '../lib/prisma'
import Carts from "./Carts"
import Product from './Product';


class User {
    constructor(
      public id: number,
      public name: string,
      public email: string,
      readonly password?: string,
      public photo?: string,
      public carts?: Array<Partial<Carts>> 
    ) {}
    
    static async create(name:string, email:string, password:string, photo: string){
        const { id } = await prisma.users.create({
            data: {
              name,
              email,
              password,
              photo,
            } 
          })
          return new User(id, name, email, password, photo )
    }
    static async findById(id: number): Promise<User | null> {
      const record = await prisma.users.findUnique({
        where: { id },
        include: {
          carts: {
            include: {
              cartItems: {
                include: {
                  product: true ,
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

    static async getProductsInCart(id: number): Promise<Product[]> {
            const cartItems = await prisma.product.findMany({
                where: { id },
                include:{
                  cartItems:{
                  include: {
                    product: true
                  }
                }
              }
              }
            )
            
            const products: Product[] = cartItems.map(cartItem => cartItem);
            return products;
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
        return new User(id, name, email ,password, photo, carts)
      }
}

export default User
