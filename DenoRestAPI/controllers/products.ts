import { v4 } from 'https://deno.land/std/uuid/mod.ts'
// typescript thing
import { Product } from '../types.ts'

let products = [
    {
        id: "1",
        name: "Product One",
        description: "This is product one",
        price: 29.99
    },
    {
        id: "2",
        name: "Product Two",
        description: "This is product two",
        price: 39.99
    },
    {
        id: "3",
        name: "Product Three",
        description: "This is product three",
        price: 49.99
    },
]

// Get all products
// route GET /api/v1/products
const getProducts = ({response} : {response: any}) => {
    response.body = {
        success: true,
        data: products
    }
}

// // get single product
// // route GET /api/v1/products/:id
const getSingleProduct = ({params, response}: {params: {id: string}, response: any}) => {
    // response.body = 'get' just for testing;
    // using typesript, this is saying we expect to get back a Product that matches the interface or undefined since its not found
    const product: Product | undefined = products.find(p => p.id === params.id);

    if(product){
        response.status = 200;
        response.type = "application/json";
        response.body = {
            success: true,
            data: product
        }} else {
            response.status = 404;
            response.type = "application/json";
            response.body = {
                success: false,
                msg: 'No product found'
            }
        }
}

// // Add product
// // route POST /api/v1/products
// test cases; make sure you set the content-type header in postman to application/json
// when testing the catch block use only http://localhost:5000/api/v1/products
// when testing the try block use this in the body raw JSON: {"name": "Product Four","description": "This is product four","price": 59.99}
const addProduct = async ({ request, response }: {request: any, response: any}) => {
    const body = request.body();
    try {
        const product: Product = await body.value;
        product.id = v4.generate();
        products.push(product);
        response.status = 201;
        response.type = "application/json";
        response.body = {
            success: true,
            data: product
        }
    } catch(err) {
        console.log(err);
        response.status = 400;
        response.type = "application/json";
        response.body = {
            success: false,
            msg: 'No data'
        }
    }
}

// update product
// route PUT /api/v1/products/:id
// use PUT http://localhost:5000/api/v1/products/1 with body raw JSON: {"name": "Updated number one", "description":"different description"}
const updateProduct = async ({params, request, response}: {params: {id: string},request: any, response: any}) => {
    const product: Product | undefined = products.find(p => p.id === params.id);

    try {
        const body = request.body();

        const updateData: {name?: string; description?: string; price?: number} = await body.value;

        products = products.map(p => p.id === params.id ? {...p,...updateData} : p);

        response.status = 200;
        response.body = {
            success: true,
            data: products
        }
    } catch(err){
        response.status = 404;
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

// // delete product
// // route DELETE /api/v1/products/:id
const deleteProduct = ({params, response}: {params: {id: string},response: any}) => {
    products = products.filter(p => p.id !== params.id)
    response.body = {
        success: true,
        msg: 'product removed'
    }
}

export { getProducts, getSingleProduct, addProduct, updateProduct, deleteProduct }