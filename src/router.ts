import express from 'express'
import UsersController from './controllers/users.controller'
import CartItemsController from './controllers/cartItems.controller'
import ProductController from "./controllers/product.controller"
import CartsController from "./controllers/carts.controller"
import auth from './middlewares/auth'


const router = express.Router()

router.post('/users', UsersController.createUser)
router.get('/me', auth, UsersController.loginMe)
router.post('/login', UsersController.loginUser)

router.post('/products', CartItemsController.createCart)
router.post('/products/item', ProductController.createProduct)
router.post('/products/carts', auth, CartsController.addProduct)


router.get('/products/cartsdetails', UsersController.getAllCartDetails)
router.get('/products', UsersController.getProductsInCart)
router.get('/products/items', ProductController.getAllProducts)

export default router
