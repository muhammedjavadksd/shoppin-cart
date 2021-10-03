var db=require('../config/connections')
var objectId=require('mongodb').ObjectId
module.exports={
     addProduct:(product,callback)=>{
         db.get().collection('product').insertOne(product).then((data)=>{
              callback(data.insertedId)
         })
     },
     getAllProduct:()=>{
         return new Promise(async (resolve,reject)=>{
            const product=await db.get().collection('product').find().toArray()
            resolve(product)
         })
      },
      deleteProduct:(proId)=>{
           return new Promise((resolve,reject)=>{
               db.get().collection('product').deleteOne({_id:objectId(proId)}).then((response)=>{
                    console.log(response);
                    resolve(response)
               })
           })
      },
      getOneProduct:(proId)=>{
           return new Promise((resolve,reject)=>{
                db.get().collection('product').findOne({_id:objectId(proId)}).then((product)=>{
                     resolve(product)
                })
           })
      },
      updateProduct:(proId,productDetails)=>{
           return new Promise((resolve,reject)=>{
                db.get().collection('product')
                .updateOne({_id:objectId(proId)},{
                     $set:{
                          name:productDetails.name,
                          price:productDetails.price,
                          category:productDetails.category
                     }
                }
                ).then((response)=>{
                     resolve()
                })
           })
      } 
 }