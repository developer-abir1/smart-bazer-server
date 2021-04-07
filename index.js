const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 4500



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1arad.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db(`${process.env.DB_NAME}`).collection("product");
  


 app.post("/addProducts", (req, res) =>{
   
  const product = req.body
  productsCollection.insertOne(product)
  .then(result =>{
    res.send(result.insertedCount > 0)
  })
 })
 
 app.get("/products", (req, res) =>{
   productsCollection.find()
   .toArray((err, document) =>{
     res.send(document)
   })
 })





});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})