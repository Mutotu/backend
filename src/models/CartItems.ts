import Carts from "./Carts"; 
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
    ) {}

    static async create(quantity: number, extraDetail: string, cartItemId:number, productId: number, product: Product ): Promise<CartItems | null>{
        const { id } = await prisma.cartItem.create({
            data: {
                quantity,
                extraDetail,
                cart : {
                    connect: { id: cartItemId}
                },
                product: {
                    connect: { id: productId },
                }                     
            } 
                } as any)
            return new CartItems(id, quantity ,extraDetail, cartItemId, undefined, productId,product  )
    }
}

export default CartItems;