import { setupWorker,rest } from 'msw';
import { loginServices } from './services';
import base64Image from '../as.jpg.jpg'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const worker = setupWorker(
    
  // Handles a POST /login request
    rest.post('/login', (req,res,ctx)=>{
      let response = loginServices(req.body);
      return res(
        ctx.status(response.status),
        ctx.json(response)
      )
    }),


     // Handles a GET /With SIngle Id
    rest.get('/product', (req, res, ctx) => {
      const productId = req.url.searchParams.get('id')
      return res(
        ctx.json({
          productId,
        }),
      )
    }),

     // Handles a GET /With Multiple Id
    rest.get('/products', (req, res, ctx) => {
      const productIds = req.url.searchParams.getAll('id')
      return res(
        ctx.json({
          productIds,
        }),
      )
    }),

    //Image Buffer
    rest.get('/images', async (_, res, ctx) => {
      // Convert "base64" image to "ArrayBuffer".
      const imageBuffer = await fetch(base64Image).then((res) =>
        res.arrayBuffer(),
      )
      return res(
        ctx.set('Content-Length', imageBuffer.byteLength.toString()),
        ctx.set('Content-Type', 'image/jpeg'),
        // Respond with the "ArrayBuffer".
        ctx.body(imageBuffer),
      )
    }),


    rest.get('/images', async (_, res, ctx) => {
      // Convert "base64" image to "ArrayBuffer".
      const imageBuffer = await fetch(base64Image).then((res) =>
        res.arrayBuffer(),
      )
      return res(
        ctx.set('Content-Length', imageBuffer.byteLength.toString()),
        ctx.set('Content-Type', 'image/jpeg'),
        // Respond with the "ArrayBuffer".
        ctx.body(imageBuffer),
      )
    }),

    
    rest.get('/api/text-stream', (req, res, ctx) => {
      // Create a binary response as a Buffer
      // const binaryData = Buffer.from('Mock binary image', 'binary');
      const textData ='column1,column2,column3\nvalue1,value2,value3554';

      // Return the binary response
      return res(
        ctx.set('Content-Type', 'text/csv'),
        ctx.body(textData),
      )
    })



  
    
)
worker.start();



