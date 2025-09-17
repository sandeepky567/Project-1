const express = require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require('./models/listing');
const path=require('path');
const methodOverride = require('method-override');
const ejsMate=require('ejs-mate');


async function   main(){
     const mongourl="mongodb://127.0.0.1:27017/bookmyland";
    await mongoose.connect(mongourl);
}
main().then(()=>{
    console.log("connected to db");   
}).catch((err)=>{ 
    console.log(err);
});



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
    res.send("Wapas jaa lavde....");
});

app.get('/listings',async (req,res)=>{
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs",{alllistings})
});

//New and create route
app.get('/listings/new',(req,res)=>{
    res.render("listings/new.ejs");
});

//show route
app.get('/listings/:id',async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//create route
app.post('/listings',async (req,res)=>{
  const newlisting=new Listing(req.body.listing);
  await newlisting.save();
  res.redirect(`/listings/${newlisting._id}`);
 
});

//edit route
app.get('/listings/:id/edit',async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
} );

//update route
 app.put('/listings/:id',async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id,req.body.listing,{runValidators:true,new:true});
    res.redirect(`/listings/${listing._id}`);
 });

//delete route
    app.delete('/listings/:id',async (req,res)=>{
        const {id}=req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect('/listings');
    });
      
// app.get('/testListing',async (req,res)=>{
//     let samplelisting=new Listing({
//     title:"Big Boss Ranch",
//     description:"A beautiful ranch in Texas",
//     price:1000000,
//     location:"Pune",
//     country:"INDIA"
//     });

//     await samplelisting.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });


app.listen(8080,()=>{
    console.log("server started at port 8080");
});