var bcrypt = require('bcrypt')
var db=require('../config/connections')
var bcrypt=require('bcrypt')
var objectId=require('mongodb').ObjectId

 module.exports={
    doSignup:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection('user').insertOne(userData).then((data)=>{
                resolve(data.insertedId )        
            })
        })
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            var loginStatus=false
            var response={}
            var user=await db.get().collection('user').findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log('login success');
                        response.user=user
                        response.status=true
                         resolve(response)
                    }else{
                        console.log("login error");
                        resolve({status:false})
                    }
                })
            }else{
                console.log('Mail not valid');
                resolve({status:false})
            }
            
        })
    },
    addToCart:(proId,userId)=>{
         return new Promise(async(resolve,reject)=>{
              let userCart=await db.get().collection('cart').findOne({user:objectId(userId)})

              if(userCart){
                  db.get().collection('cart')
                  .updateOne({user:objectId(userId)},
                  {
                      $push:{product:objectId(proId)}
                  } 
                  ).then((response)=>{
                    resolve()
                })
              }
              else{
                let cartObj={
                    user:objectId(userId),
                    product:[objectId(proId)]
                }
                db.get().collection('cart').insertOne(cartObj).then((response)=>{
                    resolve(response)
                })
              }
               
         })
    }
 }