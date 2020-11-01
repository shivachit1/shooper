const express = require('express');
const router = express.Router();
const Business = require('../../models/business');

//get all Products details
router.get('/',async(req,res)=>{
    try{
        const business = await Business.find();

        res.json(business);

    }catch(err){
            res.send('error:'+err);
    }
});


//get Product by ID details
router.get('/:id',async(req,res)=>{
    try{
        const business = await Business.find({'businessOwner':req.params.id});

        res.json(business);

    }catch(err){
            res.send('error:'+err);
    }
});

//post New Product Details
router.post('/',async(req,res)=>{

    console.log(req.body)
    console.log(req.user)
    const business = new Business({
        businessOwner:req.body.businessOwner,
        businessName :req.body.businessName,
        businessImageUri: req.body.businessImageUri,
        businessDescription:req.body.businessDescription,
        location : {
            lattitude:req.body.location.lattitude,
            longitude:req.body.location.longitude
        }

    });

    try{
            const p1 = await business.save();
            console.log('business created:' + business);
            res.json(p1);

    }catch(err){
        res.send('error:'+ err )
    }
});


//update  business Details
router.post('/:id',(req,res)=>{
    const id = req.params.id;

  Business.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update business with id=${id}. Maybe business was not found!`
        });
      } else res.send({ message: "business was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating business with id=" + id
      });
    });
});


//delete business Details
router.delete('/:id',(req,res)=>{
    Business.findByIdAndRemove(req.params.id)
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete business with id=${id}. Maybe business was not found!`
          });
        } else {
          res.send({
            message: "business was deleted successfully!"
          });
        }
      })
  
});

module.exports = router;