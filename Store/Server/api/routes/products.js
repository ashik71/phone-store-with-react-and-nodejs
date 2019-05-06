const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/',(req,res,next)=>{
    Product.find()
    .select("_id name price")
    .exec()
    .then(_products =>{
        if(_products.length >0){
            const result = {
                count: _products.length,
                products: _products
            }
            res.status(200).json(result);
        }
        else{
            res.status(404).json({message:"There is no product(s)"});                    
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(200).json({error:err});
    })

});

router.post('/',(req,res,next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    
    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            Message:"Handling POST request to /products",
            createdProduct: product   
            });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
           error: error  
            });
    })    
});

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;   
    Product.findById(id)
            .exec()
            .then(result => {
                if(result)
                {
                    console.log(result);
                    res.status(200).json(result);
                }
                else{
                    res.status(404).json({message:"Could not find the product"});                    
                }
                
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({error: err});
            });
       
    
});

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId; 
    const props = req.body;
Product.update({_id: id}, props)
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({error: err});
            });
       
    
});

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;        
    Product.remove({_id:id})
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(
                    {result:result,
                        message:"Deleted: "+id
                    }
                    );
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({error: err});
            });
       
     
    
});

module.exports = router;