import prisma from '../lib/prisma'


class Product {
    constructor(
      public id: number,
      public name: string,
      public price: string,
      public photoLink: string,
      public discount: string,
      public category: string, 
      ) {}
      
    static async create(name: string, price: string, photoLink: string, discount: string, category: string, ){
        const { id } = await prisma.product.create({
        data: {
            name,
            price,
            photoLink,
            discount, 
            category
                } 
            }as any)
            return new Product(id, name,price, photoLink, discount, category )
      }
    
    static async getAllProducts(){
        const products = await prisma.product.findMany()
        return products
    }
    
    
}

export default Product