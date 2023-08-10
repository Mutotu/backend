import prisma from '../lib/prisma'
import CartItem from "./CartItem"
// import { Prisma } from '@prisma/client';
// as Prisma.UsersCreateInput,

class User {
    constructor(
      public id: number,
      public name: string,
      public email: string,
      readonly password?: string,
      public photo?: string,
      public carts?: Array<Partial<CartItem>> 
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
            carts: true
          } 
        })
        if (record === null) {
          throw new Error('User does not exist.')
        }
        const { name, email, photo, carts } = record
        return new User(id, name, email, undefined, photo, carts)
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
