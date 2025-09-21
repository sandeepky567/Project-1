const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: String,
    image: {
         default: 'https://unsplash.com/photos/big-boss-with-white-cowboy-hat-smoking-cigar-sitting-behind-desk-american-flag-in-the-background-dngIO0oF27k',
        type: String,
        default: 'https://unsplash.com/photos/big-boss-with-white-cowboy-hat-smoking-cigar-sitting-behind-desk-american-flag-in-the-background-dngIO0oF27k',
        set:(v)=> v===''?'https://unsplash.com/photos/big-boss-with-white-cowboy-hat-smoking-cigar-sitting-behind-desk-american-flag-in-the-background-dngIO0oF27k'
        :v
       
    },

    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
