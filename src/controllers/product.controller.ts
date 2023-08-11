import { NextFunction, Request, Response } from 'express'
import Product from "../models/Product"

const ProductController = {

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
          const { name, price, photoLink, discount, category } = req.body
          const cartItem = await Product.create( name,price, photoLink, discount, category )
          res.status(201).json({ name: cartItem.name, price: cartItem.price, photoLink: cartItem.photoLink, discount: cartItem.discount, category: cartItem.category})
        return
        } catch (e) {
          next(e)
        }
      },
    async getAllProducts(_: Request, res: Response, next: NextFunction){
      try {
        const products = await Product.getAllProducts();
        res.status(200).json(products)
        return
      } catch (error) {
        next(error)
      }
    }

    }


export default ProductController