const express = require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require('./models/listing');
const path=require('path');
const methodOverride = require('method-override');
const ejsMate=require('ejs-mate');
const { title } = require('process');
const wrapAsync=require('./utlis/wrapasync.js');
const ExpressError=require('./utlis/expresserror.js');
const { listingSchema } = require('./schema.js');
const { reviewSchema } = require('./schema.js');
const Review = require('./models/review.js');
const session=require('express-session');
const flash=require('connect-flash');

// const listings=require('./routes/listings.js');
// app.use('/listings',listings);

// const reviews=require('./routes/review.js');
// app.use('/listings/:id/reviews',reviews);


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



const sessionOptions={
    secret:"mysuppersecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expire:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        httpOnly:true
    },
};
app.use(session(sessionOptions));
app.use(flash()); 


app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
}
);



const validateListing=(req,res,next)=>{
   let {error}=listingSchema.validate(req.body);
   if(error){
       throw new ExpressError(400,error);
   }else{
       next();
   }
};


const validateReview=(req,res,next)=>{
   let {error}=reviewSchema.validate(req.body);
   if(error){
       throw new ExpressError(400,error);
   }else{
       next();
   }
     
};

app.get('/',(req,res)=>{
    res.send("Wapas jaa lavde....");
});


//index route
app.get('/listings',wrapAsync(async (req,res)=>{
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs",{alllistings})
}));


//New and create route
app.get('/listings/new',(req,res)=>{
    res.render("listings/new.ejs");
});


//show route
app.get('/listings/:id',wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id).populate('reviews');
    if(!listing){
        req.flash('error','Cannot find that listing!');
        return res.redirect('/listings');
    }
    res.render("listings/show.ejs",{listing});
}));


//create route
app.post('/listings',validateListing,
    wrapAsync(async (req,res,next)=>{

    
  const newlisting=new Listing(req.body.listing);
  await newlisting.save();
  req.flash('success','Successfully made a new listing');
  res.redirect(`/listings`);

}));

//edit route
app.get('/listings/:id/edit',wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
     req.flash('success','Successfully edited a listing');
    res.render("listings/edit.ejs",{listing});
}));

//update route
app.put('/listings/:id',wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid Listing Data");
    }
    const {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id,req.body.listing,{runValidators:true,new:true});
     req.flash('success','Successfully updated a listing');
    res.redirect(`/listings`);
 }));

 
 //delete route
     app.delete('/listings/:id',wrapAsync(async (req,res)=>{
         const {id}=req.params;
         await Listing.findByIdAndDelete(id);
          req.flash('success','Successfully deleted a listing');
         res.redirect('/listings');
     }));



  
//reviews route  post route
app.post('/listings/:id/reviews',validateReview, wrapAsync(async (req, res) => {

    
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);

    // // ✅ FIX: Check if listing.reviews is undefined and initialize it
    // if (!listing.reviews) {
    //     listing.reviews = [];
    // }

    listing.reviews.push(review); // Now 'reviews' is guaranteed to be an array

    await review.save();
    await listing.save();
      res.redirect(`/listings/${listing._id}`);
}));

//delete review route
  app.delete('/listings/:id/reviews/:reviewId', wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));


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

