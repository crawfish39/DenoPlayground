import { Application } from 'https://deno.land/x/oak/mod.ts';
import router from './routes.ts';

const app = new Application();


app.use(router.routes());
app.use(router.allowedMethods()); // allows all methods; get, put, post, delete

console.log(`Server running on port 5000;`)

await app.listen({port: 5000})

//deno run --allow-net server.ts
// test using postman GET http://localhost:5000/api/v1/products