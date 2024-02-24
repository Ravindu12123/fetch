const axios = require('axios');
const cheerio = require('cheerio');
const express=require('express');
const VD=require("validator");
const cors=require('cors');
const app=express();
app.use(cors());


app.get('/getjson',async (req,res)=>{
  const url=req.query.url;
axios.get(url)
    .then(response => {
        const html = response.data;
        
        const $ = cheerio.load(html);

        const tagToJson = (element) => {
            let obj = {
                name: element.name,
                attributes: element.attribs,
                children: [],
                innerText: element.children[0] ? element.children[0].data : null
            };
            
            element.children.forEach(child => {
                if (child.type === 'tag') {
                    obj.children.push(tagToJson(child));
                }
            });
        
            return obj;
        };

        const htmlJson = tagToJson($('html').get(0));
        
        const htmlJsonString = JSON.stringify(htmlJson, null, 2);
        res.status(200).send(htmlJsonString);
    })
    .catch(error => {
        res.status(400).send('Error fetching URL:', error);
    });
});

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