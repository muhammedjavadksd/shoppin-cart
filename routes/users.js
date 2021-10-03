var express = require('express');
var router = express.Router();
var productHelpers=require('../productHelpers/productHelpers');
const userHelpers = require('../productHelpers/userHelpers');
 
const verfiedLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelpers.getAllProduct().then((product)=>{
    res.render('user/index', { product ,admin:false,user});
  })
 });

 router.get('/login',(req,res)=>{
   if(req.session.loggedIn){
    res.redirect('/')
   }else{ 
    res.render('user/login',{"logginErr":req.session.logginErr})
    req.session.logginErr=false
   }
 })
 router.get('/register',(req,res)=>{
  res.render('user/register')
})

router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((data)=>{
    console.log(data);
    req.session.loggedIn=true
      req.session.user=data
      res.redirect('/')
  })
})
 
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
       req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      req.session.logginErr=true
      res.redirect('/login')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/login')
})
router.get('/cart',verfiedLogin,(req,res)=>{
    res.render('user/cart')
})
 
router.get('/add-to-cart/:id',verfiedLogin,(req,res)=>{
  userHelpers.addToCart(req.params.id,req.session._id).then(()=>{
    res.redirect('/')
  })
})
module.exports = router;
