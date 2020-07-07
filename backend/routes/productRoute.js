import express from 'express';
import { isAuth, isAdmin, getToken } from '../util';
import pool from '../db/dbConfig';
import jwt from 'jsonwebtoken';
const app = express();
const router = express.Router();

router.get("/", async(req, res) => {
  await
  pool
  .query('SELECT Id, sfid,name, ProductCode, Price__c, Brand__c, category__c, countInStock__c, Description__c, rating__c, numReviews__c, DisplayUrl FROM salesforce.Product2')
  .then((productQueryResult) => 
    {
      console.log('productQueryResult   : '+JSON.stringify(productQueryResult.rows));
       res.send(productQueryResult.rows);
    })
  .catch((productQueryError) =>
    {
      console.log('productQueryError  : '+productQueryError);
       res.send(productQueryError);
    })
});

router.post("/", async(req, res) => {
  let body = req.body;
  let name= req.body.name;
  let price= req.body.price;
  let proCode= req.body.proCode;
  let image= req.body.image;
  let brand= req.body.brand;
  let category= req.body.category;
  let countInStock= req.body.countInStock;
  let description= req.body.description;
  console.log(req.body);
  {
  await
  pool
            .query('INSERT into salesforce.Product2(name, ProductCode, Price__c, Brand__c, category__c, countInStock__c, Description__c, DisplayUrl) values ($1, $2, $3, $4, $5, $6, $7, $8)',[name,proCode,price,brand,category,countInStock,description,image])
            .then((productQueryResult)=>{
         //  let userId = productQueryResult.rows[0].sfid;
             let objPro = productQueryResult.rows[0];
              console.log('productQueryResult.rows : '+JSON.stringify(productQueryResult));
                /******* Successfully  Inserted*/
             return (res.status(201).send({ message: 'New Product Created', data: objPro }));
            })
            .catch((productInsertQueryError)=> {
              console.log('productInsertQueryError '+productInsertQueryError);
            return (res.status(500).send({message: 'Error in creating Product.'}));
            })
          }
});


export default router;
