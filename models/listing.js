const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;
const Review = require('./review');

const listingSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: String,
    image: {
         default: 'https://static2.tripoto.com/media/filter/nl/img/15546/TripDocument/1448884461_01_exterior_dusk_1_lg_47_fotor.jpg',
        type: String,
     
        set:(v)=> v===''?'https://static2.tripoto.com/media/filter/nl/img/15546/TripDocument/1448884461_01_exterior_dusk_1_lg_47_fotor.jpg'
        :v
          
    },

    price: Number,
    location: String,
    country: String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'Review'
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

listingSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
