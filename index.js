const express = require("express");
const cors = require("cors");
require('./db/config');
const user = require("./db/user");
const product = require("./db/product")
const Jwt = require("jsonwebtoken");
const jwtkey = "e-comm"

const app = express();
app.use(cors());

app.use(express.json());
app.post("/register", async (req,resp)=>{
    const User = new user(req.body);
    let result = await User.save();
    result = result.toObject();
    delete result.password
    //token for registeration
    Jwt.sign({result}, jwtkey, {expiresIn: "2h"}, (err, token)=>{
      if(err){
        resp.send({result: "something went wrong, please try after sometime"})
      }
      resp.send({result , auth: token})
    })
})

app.post("/login", async (req,resp)=>{
    console.log(req.body)
    if(req.body.password && req.body.email)
    {
        let User = await user.findOne(req.body).select("-password");
        //jwt token define and if show err for this i wrote code
        if(User){
          Jwt.sign({User}, jwtkey, {expiresIn: "2h"}, (err, token)=>{
            if(err){
              resp.send({result: "something went wrong, please try after sometime"})
            }
            resp.send({User , auth: token})
          })

        }else{
            resp.send({result: 'No User Found '})
        }
    }else{
        resp.send({result: 'No User Found pass'})
    }
})

app.post("/add-product", async (req,resp)=>{
    const Product = new product(req.body);
    let result = await Product.save();
    resp.send(result);
})
// Make Router for Product List API
//Fetch Data from database
app.get("/products", async (req, resp) => {
    let products = await product.find();
  
    if (products.length > 0) {
      resp.send(products);
    } else {
      resp.send({ result: "No Products found" });
    }
  });
//Make Route for API
  app.delete("/product/:id", async (req,resp)=>{
    // Get id with params in API URL
    //Delete product from DB
    const result = await product.deleteOne({_id:req.params.id});
    resp.send(result)
  })

  //Update Product Api route
  app.get("/product/:id", async (req,resp)=>{
    const result = await product.findOne({_id:req.params.id});
   if(result)
   {
    resp.send(result)
   } else{
    resp.send({"result":"result No Found"})
   }
  })
//code for update DB 
//This is api for Update db
  app.put("/product/:id", async (req, resp)=>{
    let result = await product.updateOne(
      {_id: req.params.id},
      {
        $set : req.body
      }
    )
    resp.send(result)
  })

// Make API for Search result

app.get("/search/:key", async (req, resp)=>{
  let result = await product.find({
    "$or": [
      {name: {$regex: req.params.key}},
      {company: {$regex: req.params.key}},
      {category: {$regex: req.params.key}}
    ]
  })
  resp.send(result)
})

app.listen(5000, ()=>{
    console.log("server is running on 5000")
});

