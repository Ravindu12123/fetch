const express=require('express');
const VD=require("validator");
const cors=require('cors');
const app=express();
app.use(cors());

app.get('/',function(req,res){
res.status(200).send("Hello World");
})

app.get("/get",async (req,res)=>{
  var url=req.query.url;
  if(url!=true){
    var validate=VD.isURL(url);
    if(validate==true){
    var u=await fetch(url).then(res=>res.text());
    res.status(200).send(u);
    }else{
      res.status(400).send("Invalid URL");
    }
  }else{
    res.status(400).send("Invalid URL");
  }
})
app.listen(3000,()=>{
  console.log("Server is running on port 3000");
})
