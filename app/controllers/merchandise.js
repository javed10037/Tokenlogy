const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/users');
var S3 = require('aws-sdk/clients/s3');
var Mail = require('../models/SendMail.js');
var fs = require('fs');
cloudinary = require('cloudinary'),
cloudinary.config({
  cloud_name: 'deviltiwari',
  api_key: '518637699796815',
  api_secret: '88bpiTcks337e8c4raAsC5vKF6g'
});
module.exports = {

'imageUpload' :(req, res)=>{
  if(!req.body.image)
    res.json({statusCode : 402 , message : 'Please fill the required fields.'})
   var imageRes = "Image uploaded successfully"
   var img_base64 = req.body.image;
   binaryData = new Buffer(img_base64, 'base64');
   console.log("Current path:   " + process.cwd())
   fs.writeFile("app/controllers/images/test1.jpeg", binaryData, "binary", function(err) {
       if (err) {
           console.log("errror in writtting file")
       } else {
               cloudinary.uploader.upload("app/controllers/images/test1.jpeg", function(result) {
                   console.log("result->>" + JSON.stringify(result))
                   if (result.url)
                       res.json({statusCode : 200 , message : 'Image uploaded successfully.', data:result.url})
                   else
                        res.json({statusCode : 500 , message : 'Something went wrong.'})
               })
       }
   });
},

'listProduct':(req,res)=>{
  if(!req.body.user_id || !req.body.name || !req.body.size || !req.body.colour || !req.body.prize || !req.body.type
    || !req.body.category || !req.body.images || !req.body.title ||!req.body.quantity || !req.body.brand)
    res.json({statusCode : 402 , message : 'PLease fill the required fields.'})
  else
  Product.create({
  name:req.body.name,
  brand:req.body.brand,
  category:req.body.category,
  type:req.body.type,
  size:req.body.size,
  price:req.body.prize,
  colour:req.body.colour,
  productBy:req.body.user_id,
  images:req.body.images,
  description:req.body.description,
  title:req.body.title,
  quantity:req.body.quantity,
  createdAt:new Date().getTime()
  })
.then((success)=>{
  if(success)
    res.json({statusCode : 200 , message : 'Your product listed successfully.', data:success})
  else
    res.json({statusCode : 500 , message : 'Something went wrong.'})
})
.catch((unsuccess)=>{
  console.log("unsuccess in list product:::: ",unsuccess)
  res.json({statusCode : 500 , message : 'Something went wrong.'})
})
},
'getProduct':(req,res)=>{
  Product.find({status:true})
  .then((success)=>{
     if(success.length)
    res.json({statusCode : 200 , message : 'Products fetch successfully.', data:success})
  else
    res.json({statusCode : 500 , message : 'No product listed.'})
  })
  .catch((unsuccess)=>{
  console.log("unsuccess in get product:::: ",unsuccess)
  res.json({statusCode : 500 , message : 'Something went wrong.'})
  console.log("this is unsucess")
})
},
'buy':(req,res)=>{
  if(!req.body.user_id || !req.body.address || !req.body.product)
    res.json({statusCode : 402 , message : 'PLease fill the required fields.'})
  else
 {
    Order.create({
  owenbuy:req.body.user_id,
  address:req.body.address,
  product:req.body.product
    })
  .then((success)=>{
     if(success){
    res.json({statusCode : 200 , message : 'Products ordered successfully.', data:success})
    Mail.buyproduct(req.body,success,function(msg){
     console.log("the mail send sucessfully",success);
  })
}
  else
    res.json({statusCode : 500 , message : 'Something went wrong'})
  })
  .catch((unsuccess)=>{
  console.log("unsuccess in get product:::: ",unsuccess)
  res.json({statusCode : 500 , message : 'Something went wrong.'})
})
}
},
'editProduct':(req,res)=>{
   if(!req.body.user_id || !req.body.name || !req.body.size ||
    !req.body.colour || !req.body.prize || !req.body.type
    || !req.body.category || !req.body.images || !req.body.title
    ||!req.body.quantity || !req.body.product_id || !req.body.brand)
    res.json({statusCode : 402 , message : 'PLease fill the required fields.'})
  else
  Product.update({_id:req.body.product_id},{$set:{
  name:req.body.name,
  brand:req.body.brand,
  category:req.body.category,
  type:req.body.type,
  size:req.body.size,
  price:req.body.prize,
  colour:req.body.colour,
  productBy:req.body.user_id,
  images:req.body.images,
  description:req.body.description,
  title:req.body.title,
  quantity:req.body.quantity,
  outOfStock:req.body.outOfStock,
  status:false
  }},{new:true})
.then((success)=>{
  if(success)
    res.json({statusCode : 200 , message : 'Your product edited successfully, it will reviewed by admin before listed on site.', data:success})
  else
    res.json({statusCode : 500 , message : 'Something went wrong.'})
})
.catch((unsuccess)=>{
  console.log("unsuccess in edit product product:::: ",unsuccess)
  res.json({statusCode : 500 , message : 'Something went wrong.'})
})
},
makeList:(req,res)=>{
  if(!req.body.product_id)
    res.json({statusCode : 402 , message : 'Please fill the required fields.'})
  else
    Product.update({_id:req.body.product_id},{$set:{status:true}},{new:true})
  .then((success)=>{
  if(success)
    res.json({statusCode : 200 , message : 'Product listed successfully!!!', data:success})
  else
    res.json({statusCode : 500 , message : 'Something went wrong.'})
})
.catch((unsuccess)=>{
  console.log("unsuccess in makelist:::: ",unsuccess)
  res.json({statusCode : 500 , message : 'Something went wrong.'})
})
},
'userOrders':(req,res)=>{
  if(!req.body.user_id)
    res.json({statusCode : 402 , message : 'Please fill the required fields.'})
  else
    Order.find({owenbuy:req.body.user_id}).populate('owenbuy product')
    .then((success)=>{
  if(success)
    res.json({statusCode : 200 , message : 'Orders', data:success})
  else
    res.json({statusCode : 500 , message : 'Something went wrong.'})
})
.catch((unsuccess)=>{
  console.log("unsuccess in makelist:::: ",unsuccess)
  res.json({statusCode : 500 , message : 'Something went wrong.'})
})
}

}
