import { PrismaClient } from '@prisma/client';
import {faker} from "@faker-js/faker"


interface Product {
    name: string;
    photoLink: string;
    price: string;
    discount: string;
    category: string;
  }

function makeData (length: number=10): Product[]{
    let data = []
    for(let i = 0; i < length; i ++){
        const product:Product = {
            name: faker.commerce.product(),
            photoLink: "https://picsum.photos/200/300",
            price: faker.commerce.price(),
            discount: String(faker.number.float({ min: 0.1, max: 0.25, precision: 0.001 })),
            category: faker.commerce.department()
        }
        data.push(product)
    }
    return data
}

const prisma = new PrismaClient();

async function main() {
   await prisma.product.createMany({ data: makeData(50) }) 
}
main()
  .catch(error => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
