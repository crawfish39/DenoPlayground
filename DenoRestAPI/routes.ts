import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getProducts, getSingleProduct, addProduct, updateProduct, deleteProduct } from './controllers/products.ts'

const router = new Router();

// creating the first route
// destructered to only take response and then typescript is saying it must be an object with a type of any
router.get('/api/v1/products', getProducts)
    .get('/api/v1/products/:id', getSingleProduct)
    .post('/api/v1/products', addProduct)
    .put('/api/v1/products/:id', updateProduct)
    .delete('/api/v1/products/:id', deleteProduct)

export default router;