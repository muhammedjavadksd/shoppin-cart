const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelpers=require('../productHelpers/productHelpers')
/* GET home page. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProduct().then((product)=>{
    console.log(product);
    res.render('admin/view-product', { product ,admin:true});
  })
 });

router.get('/add-product',(req,res)=>{
 
  res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{
  console.log(req.body)
   productHelpers.addProduct(req.body,((id)=>{
     let image=req.files.image
     image.mv('./public/product-image/'+id+'.jpg',(err,done)=>{
       if(err) console.log("image moving error"+err);
       else console.log('image moved success');
     })
     res.send("done")
   }))
 })
 router.get('/delete-product/:id',(req,res)=>{
   let proId=req.params.id
   console.log(proId);
   productHelpers.deleteProduct(proId).then((response)=>{
     res.redirect('/admin')
   })
 })

 router.get('/edit-product/:id',async(req,res)=>{
   let product=await productHelpers.getOneProduct(req.params.id)
    res.render('admin/edit-product',{product})
   })
  
router.post('/edit-product/:id',(req,res)=>{
  var id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    if(req.files.image){
      let image=req.files.image
     image.mv('./public/product-image/'+id+'.jpg')
    }
    res.redirect('/admin')
  })
})
module.exports = router;
