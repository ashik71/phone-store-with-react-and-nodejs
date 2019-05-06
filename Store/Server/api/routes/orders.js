const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
    Message:"Orders returned"    
    });
});

router.post('/',(req,res,next)=>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        Message:"Order created",
        Order: order  
        });
});

router.get('/:orderId',(req,res,next)=>{      
        res.status(200).json({               
            Message:"Order details"    
            });  
    
});
router.delete('/:orderId',(req,res,next)=>{      
    res.status(200).json({               
        Message:"Order deleted"    
        });  

});
module.exports = router;
