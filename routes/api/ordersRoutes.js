
const express = require('express');
const router = express.Router();
const Order = require('../../models/order');

//get all orders details
router.get('/:id',async(req,res)=>{
    try{
        const orders = await Order.find({'orderBy':req.params.id});
        console.log('get user orders')
      console.log(orders);
      console.log(req.params.id);
        res.json(orders);

    }catch(err){
            res.send('error:'+err);
    }
});

//get all orders details
router.get('/business/:id',async(req,res)=>{
    try{
        const orders = await Order.find({'orderTo':req.params.id});
        console.log('get business orders')
      console.log(orders);
      console.log(req.params.id);
        res.json(orders);

    }catch(err){
            res.send('error:'+err);
    }
});


//post New order Details
router.post('/',async(req,res)=>{

    console.log("orders being created");
    const order = new Order({
        orderBy:req.body.orderBy,
        orderTo :req.body.orderTo,
        orderTime:req.body.orderTime,
        status:req.body.status,
        products:req.body.products,
        totalPrice:req.body.totalPrice

    });
    console.log(order);
    try{
            const p1 = await order.save();
            console.log('order created:' + order);
            res.json(p1);

    }catch(err){
        res.send('error:'+ err )
    }

});

module.exports = router;