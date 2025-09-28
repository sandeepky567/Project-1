const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require('../utlis/wrapasync.js');
const ExpressError=require('../utlis/expresserror.js');
const { reviewSchema } = require('../schema.js');
const Review = require('../models/review.js');
const Listing=require('../models/listing.js');



const validateReview=(req,res,next)=>{
   let {error}=reviewSchema.validate(req.body);
   if(error){
       throw new ExpressError(400,error);
   }else{
       next();
   }
     
};
  
//reviews route  post route
router.post('/',validateReview, wrapAsync(async (req, res) => {

    
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
  router.delete('/:reviewId', wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));

module.exports=router;