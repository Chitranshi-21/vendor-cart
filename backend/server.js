import express from 'express';
import data from './data';
import user from './routes/userRoute';
import bodyParser from 'body-parser';
import path from 'path';
import productRoute from './routes/productRoute';

const app = express();

app.use(bodyParser.json());


app.get("/api/products/:id", async(req, res) => {
  const productId = req.params.id;
  const product = await data.products.find(x=>x._id === productId);
  if(product)
  res.send(product);
  else
  res.status(404).send({msg: "Product not found"})
});
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.use('/api/users', user);
app.use('/api/product', productRoute);
app.use(express.static(path.join(__dirname, '/../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(5000, () => {
  console.log('Server started at http://localhost:5000');
});