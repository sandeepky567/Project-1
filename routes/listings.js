const express=require('express');
const router=express.Router();
const wrapAsync=require('../utlis/wrapasync.js');
const { listingSchema } = require('../schema.js');
const ExpressError=require('../utlis/expresserror.js');
const Listing=require('../models/listing.js');


const validateListing=(req,res,next)=>{
   let {error}=listingSchema.validate(req.body);
   if(error){
       throw new ExpressError(400,error);
   }else{
       next();
   }
};




//index route
router.get('/',wrapAsync(async (req,res)=>{
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs",{alllistings})
}));


//New and create route
router.get('/new',(req,res)=>{
    res.render("listings/new.ejs");
});


//show route
router.get('/:id',wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id).populate('reviews');
    res.render("listings/show.ejs",{listing});
}));


//create route
router.post('/',validateListing,
    wrapAsync(async (req,res,next)=>{

    
  const newlisting=new Listing(req.body.listing);
  await newlisting.save();
  res.redirect(`/listings/${newlisting._id}`);

}));

//edit route
router.get('/:id/edit',wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//update route
router.put('/:id',wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid Listing Data");
    }
    const {id}=req.params;
    const listing=await Listing.findByIdAndUpdate(id,req.body.listing,{runValidators:true,new:true});
    
    res.redirect(`/listings`);
 }));

 
 //delete route
     router.delete('/:id',wrapAsync(async (req,res)=>{
         const {id}=req.params;
         await Listing.findByIdAndDelete(id);
         res.redirect('/listings');
     }));



     module.exports=router;