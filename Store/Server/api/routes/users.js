const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

router.get('/',(req,res,next)=>{
    User.find()
    .select("_id name email")
    .exec()
    .then(_users =>{
        if(_users.length >0){
            const result = {
                count: _users.length,
                users: _users
            }
            res.status(200).json(result);
        }
        else{
            res.status(404).json({message:"There is no user(s)"});                    
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(200).json({error:err});
    })

});

router.post('/signup',(req,res,next)=>{
    User.find({email:req.body.email})
        .exec()
        .then(user=>{
            if(user.length >0){
               return res.status(409).json({
                   user:user,
                    message:'Email exsits'
                });
            }
            else{
                bcrypt.hash( req.body.password,10,(err,hash)=>{
                    if(err){
                        return res.status(500).json({
                            error:err
                        });
                    }
                    else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    Message:"Handling POST request to /users",
                                    createdUser: result   
                                    });
                            }).catch(error => {
                                console.log(error);
                                res.status(500).json({
                                error: error  
                                    });
                            })    
                    }
                })
            }
        }) 
});

router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
        .exec()
        .then(user=>{
            if(user.length <1){
               return res.status(401).json({                   
                    message:'Unauthorized user'
                });
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err)
                {
                    return res.status(401).json({                   
                        message:'Unauthorized user'
                    });
                }
                if(result){
                   const token = jwt.sign({
                        email: user[0].email,
                        userID: user[0]._id
                    },'secret',{
                        expiresIn:'1h'
                    });
                    return res.status(201).json({                   
                        message:'Login successful',
                        isAuth: true,
                        token:token
                    });
                }
                return res.status(401).json({                   
                    message:'Unauthorized user'
                });
            })
        }) 
})

router.get('/:userId',(req,res,next)=>{
    const id = req.params.userId;   
    User.findById(id)
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

router.patch('/:userId',(req,res,next)=>{
    const id = req.params.userId; 
    const props = req.body;
User.update({_id: id}, props)
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

router.delete('/:userId',(req,res,next)=>{
    const id = req.params.userId;        
    User.remove({_id:id})
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