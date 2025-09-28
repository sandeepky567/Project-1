const express = require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require('./models/listing');
const path=require('path');
const methodOverride = require('method-override');
const ejsMate=require('ejs-mate');
// const { title } = require('process');
const wrapAsync=require('./utlis/wrapasync.js');
const ExpressError=require('./utlis/expresserror.js');
// const { listingSchema } = require('./schema.js');
// const { reviewSchema } = require('./schema.js');
// const Review = require('./models/review.js');



const listings=require('./routes/listings.js');
app.use('/listings',listings);

const reviews=require('./routes/review.js');
app.use('/listings/:id/reviews',reviews);


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

app.all('*',(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

//error handling middleware

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;
   // res.status(statusCode).send(message);
   res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080,()=>{
    console.log("server started at port 8080");
});

