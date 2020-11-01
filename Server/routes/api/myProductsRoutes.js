const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

//get all Products details
router.get('/:id',async(req,res)=>{
    try{
        const products = await Product.find({'productOwnerId':req.params.id});
        console.log('calling from ')
      console.log(products);
      console.log(req.params.id);
        res.json(products);

    }catch(err){
            res.send('error:'+err);
    }
});


//post New Product Details
router.post('/',async(req,res)=>{

    console.log(req.body)
    const product = new Product({
        productOwnerId:req.body.productOwnerId,
        productName :req.body.productName,
        productImageUri:req.body.productImageUri,
        productDescription:req.body.productDescription,
        price : req.body.price,
        productQuantity:req.body.productQuantity

    })

    try{
            const p1 = await product.save();
            res.json(p1);
    }catch(err){
        res.send('error:'+ err )
    }
});


//update  Product Details
router.post('/:id',(req,res)=>{
    const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update product with id=${id}. Maybe product was not found!`
        });
      } else res.send({ message: "product was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating product with id=" + id
      });
    });
});


//delete Product Details
router.delete('/:id',(req,res)=>{
    Product.findByIdAndRemove(req.params.id)
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete product with id=${id}. Maybe product was not found!`
          });
        } else {
          res.send({
            message: "product was deleted successfully!"
          });
        }
      })
  
});

module.exports = router;