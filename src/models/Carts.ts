import CartItems from "./CartItems"
import prisma from '../lib/prisma'

class Carts {
    constructor(
        public id: number,
        public userId: number,
        public carts?: Array<Partial<CartItems>> 
    ) {}
    
    static async create(userId: number): Promise<Carts | null>{
        const { id } = await prisma.cart.create({
            data: {
                user: {
                    connect: { id: userId },
                }
            } 
                } as any)
        return new Carts(id, userId )
    }

}

export default Carts