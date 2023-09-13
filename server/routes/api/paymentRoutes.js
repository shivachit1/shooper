const express = require('express');
const router = express.Router();
const Payment = require('../../models/payment');

//get all Products details
router.get('/',async(req,res)=>{
    try{
        const payments = await Payment.find();

        res.json(payments);

    }catch(err){
            res.send('error:'+err);
    }
});


//get Product by ID details
router.get('/:id',async(req,res)=>{
    try{
        const payment = await Payment.findById(req.params.id);

        res.json(payment);

    }catch(err){
            res.send('error:'+err);
    }
});

//post New Product Details
router.post('/',async(req,res)=>{

    console.log(req.body)
    const payment = new Payment({
        productName :req.body.cardHolderName,
        productDescription:req.body.cardNumber,
        expiryTime:{
            month:req.body.expiryTime.month,
            year:req.body.expiryTime.year
        },
        cvv : req.body.cvv

    });

    try{
            const p1 = await payment.save();
            res.json(p1);
    }catch(err){
        res.send('error:'+ err )
    }
});

//post New Product Details
router.post('/:id/pay',async(req,res)=>{

    console.log(req.body)
    const payment = new Payment({
        productName :req.body.cardHolderName,
        productDescription:req.body.cardNumber,
        expiryTime:{
            month:req.body.expiryTime.month,
            year:req.body.expiryTime.year
        },
        cvv : req.body.cvv

    });

    try{
            const p1 = await payment.save();
            res.json(p1);
    }catch(err){
        res.send('error:'+ err )
    }
});


//update  Product Details
router.post('/:id',(req,res)=>{
    const id = req.params.id;

  Payment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Payment details with id=${id}. Maybe payment was not found!`
        });
      } else res.send({ message: "Payment was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Payment details with id=" + id
      });
    });
});


//delete Product Details
router.delete('/:id',(req,res)=>{
    Payment.findByIdAndRemove(req.params.id)
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete payment Details with id=${id}. Maybe payment was not found!`
          });
        } else {
          res.send({
            message: "Payment details was deleted successfully!"
          });
        }
      })
  
});



module.exports = router;