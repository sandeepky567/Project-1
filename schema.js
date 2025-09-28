// const Joi=require('joi');


// module.exports.listingSchema=Joi.object({
//     listing:Joi.object({
//         title:Joi.string().required(),
//         description:Joi.string().required(),
//         price:Joi.number().min(0).required(),
//         location:Joi.string().required(),
//         image:Joi.string().allow(''),
//         country:Joi.string().required()
//     }).required(),
// });

// module.exports.reviewSchema=Joi.object({
//     review:Joi.object({
//         rating:Joi.number().min(1).max(5).required(),
//         comment:Joi.string().required().allow('')
//     }).required()   
// });
// schema.js

const Joi = require('joi');


module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        image: Joi.string().allow('', null),
        country: Joi.string().required()
    }).required(),
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        
        // FIX: You must add .allow('') because the HTML form sends an empty string
        // when a user leaves the comment field blank.
        comment: Joi.string().required().allow('') 
        
    }).required()   
});