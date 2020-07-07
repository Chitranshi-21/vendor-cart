import express from 'express';
import { isAuth, isAdmin, getToken } from '../util';
import pool from '../db/dbConfig';
import jwt from 'jsonwebtoken';
const app = express();
const router = express.Router();

router.get("/pr", async(req, res) => {
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
       response.send(productQueryError);
    })
});

router.get("/", async(request, res) => {
  let body = request.body;
  let name= request.body.name;
  let price= request.body.price;
  let proCode= request.body.proCode;
  let image= request.body.image;
  let brand= request.body.brand;
  let category= request.body.category;
  let countInStock= request.body.countInStock;
  let description= request.body.description;
  console.log(request.body);
  {
  await
  pool
            .query('INSERT into salesforce.Product2(name, ProductCode, Price__c, Brand__c, category__c, countInStock__c, Description__c, DisplayUrl) values ($1, $2, $3, $4, $5, $6, $7, $8)',[name,proCode,price,brand,category,countInStock,description,image])
            .then((productQueryResult)=>{
         //  let userId = productQueryResult.rows[0].sfid;
             let objPro = productQueryResult.rows[0];
              console.log('productQueryResult.rows : '+JSON.stringify(productQueryResult));
                /******* Successfully  Inserted*/
               res.status(201).send({ message: 'New Product Created', data: objPro });
            })
            .catch((productInsertQueryError)=> {
              console.log('productInsertQueryError '+productInsertQueryError);
              res.status(500).send({message: 'Error in creating Product.'});
            })
          }
});


export default router;
