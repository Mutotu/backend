// import { Prisma } from '@prisma/client'
import prisma from '../lib/prisma'
import UserItems from "./UserItems"

class User {
    constructor(
      public id: number,
      public name: string,
      public email: string,
      readonly password?: string,
      public userItems?: Array<Partial<UserItems>> 
    ) {}
    
    static async create(name:string, email:string, password:string){
        const { id } = await prisma.users.create({
            data: {
              name,
              email,
              password,
            } ,
          })
          return new User(id, name, email, password)
    }
    static async findById(id: number): Promise<User | null> {
        const record = await prisma.users.findUnique({
          where: { id },
          include: {
            userItems: true
          },
        })
        if (record === null) {
          throw new Error('User does not exist.')
        }
        const { name, email, userItems } = record
        return new User(id, name, email, undefined,userItems)
      }

    static async findByEmail(email: string): Promise<User | null> {
        const record = await prisma.users.findUnique({
          where: { email },
          include: {
          userItems: true
          },
        })
        if (record === null) {
          throw new Error('User does not exist.')
        }
        const { id, name, password, userItems } = record
        return new User(id, name, email ,password, userItems)
      }
}

export default User
