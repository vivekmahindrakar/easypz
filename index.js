const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static(__dirname+"/src"));
app.use("/js", express.static("js"));
app.use("/images", express.static("images"));
app.set("view engine","ejs");


mongoose.connect(`mongodb+srv://ValueWealth:Vivek_2021@cluster0.hxv9z.mongodb.net/easypz?retryWrites=true&w=majority`);

//adding products manually
const productSchema = new mongoose.Schema({
    p_id: String,
    p_name:String,
    p_rate:String,
    p_description:String,
    
});

const productTranscation = new mongoose.Schema({
    p_id: String,
    p_name:String,
    p_timestamp:String,
    p_transaction:String,
    
});


 const product = new mongoose.model("product", productSchema);

 const transact = new mongoose.model("transact",productTranscation)
 /* product.insertMany([
     {
        p_id:"1",
        p_name:"Sample Product1",
        p_rate:"$469",
        p_description: "feature 1,feature 2,feature n"
    },
    {
        p_id:"2",
        p_name:"Sample Product2",
        p_rate:"$269",
        p_description: "feature 1,feature 2,feature n"
    },
    {
        p_id:"3",
        p_name:"Sample Product3",
        p_rate:"$69",
        p_description: "feature 1,feature 2,feature n"
    },
    {
        p_id:"4",
        p_name:"Sample Product4",
        p_rate:"$369",
        p_description: "feature 1,feature 2,feature n"
    },
    {
        p_id:"5",
        p_name:"Sample Product5",
        p_rate:"$169",
        p_description: "feature 1,feature 2,feature n"
    },
    {
        p_id:"6",
        p_name:"Sample Product6",
        p_rate:"$569",
        p_description: "feature 1,feature 2,feature n"
    },
 ])*/


app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/src/index.html");
})
app.get("/admin",(req,res)=>{
    transact.find({},function(err,foundItems)
    {
        if (err) {
            console.log(err);
        } else {
             res.render('admin',{products : foundItems});
            console.log(foundItems);
        }
    })
})
app.post("/product",(req,res)=>{
var id = req.body.pName;
console.log(id);
product.findOne({p_id:id }, function (err, foundItems) {
    if (err) {
        console.log(err);
    } else {
         res.render('product',{product : foundItems});
        console.log(foundItems);
    }


})});

app.post("/buyed",(req,res)=>{
    var name = req.body.name;
    var id = req.body.id;
    var transaction = Math.floor(Math.random()*100000);
    var time = new Date()
    if(time.getDay()==0)
    var timestamp = "Sun "+time.getDate()+"/"+time.getMonth()+"/"+time.getFullYear()+" "+time.getHours()+":"+time.getMinutes();
    if(time.getDay()==1)
    var timestamp = "Mon "+time.getDate()+"/"+time.getMonth()+"/"+time.getFullYear()+" "+time.getHours()+":"+time.getMinutes();
    if(time.getDay()==2)
    var timestamp = "Tue "+time.getDate()+"/"+time.getMonth()+"/"+time.getFullYear()+" "+time.getHours()+":"+time.getMinutes();
    if(time.getDay()==3)
    var timestamp = "Wed "+time.getDate()+"/"+time.getMonth()+"/"+time.getFullYear()+" "+time.getHours()+":"+time.getMinutes();
    if(time.getDay()==4)
    var timestamp = "Thu "+time.getDate()+"/"+time.getMonth()+"/"+time.getFullYear()+" "+time.getHours()+":"+time.getMinutes();
    if(time.getDay()==5)
    var timestamp = "Fri "+time.getDate()+"/"+time.getMonth()+"/"+time.getFullYear()+" "+time.getHours()+":"+time.getMinutes();
    if(time.getDay()==6)
    var timestamp = "Sat "+time.getDate()+"/"+time.getMonth()+"/"+time.getFullYear()+" "+time.getHours()+":"+time.getMinutes();
    transact.insertMany(
        {
            p_id: id,
            p_name:name,
            p_timestamp:timestamp,
            p_transaction:transaction,   
        }
    );
    console.log("product buyed with transaction "+transaction);

})


app.listen(PORT,()=>{
    console.log("listening on port "+PORT);
});
