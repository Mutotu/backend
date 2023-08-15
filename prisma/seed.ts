import { PrismaClient } from '@prisma/client';
import { faker } from "@faker-js/faker"
import axios from 'axios'


interface Product {
  name: string;
  photoLink: string;
  price: string;
  discount: string;
  category: string;
}
interface FakeProduct {
  id: number,
  title: string,
  price: number,
  category: string,
  image: string,

}

async function makeData(length = 25): Promise<Product[]> {
  const retrievedData = async () => {
    const fetched = await axios(
      "https://fakestoreapi.com/products?limit=" + length
    );
    const json = fetched.data as FakeProduct[];
    return json;
  };
  const jsonData = await retrievedData();
  let data = [];
  for (let i = 0; i < jsonData.length; i++) {
    const product = {
      name: jsonData[i].title,
      photoLink: jsonData[i].image,
      price: String(jsonData[i].price),
      discount: String(faker.number.float({ min: 0.1, max: 0.25, precision: 0.001 })),
      category: jsonData[i].category
    };
    data.push(product);
  }
  console.log(data);
  return data;
}
const prisma = new PrismaClient();

async function main() {
  const products = await makeData(50);
  await prisma.product.createMany({ data: products })
}
main()
  .catch(error => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });