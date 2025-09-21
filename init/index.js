const mongoose = require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

 

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});



async function   main(){
    const mongourl="mongodb://127.0.0.1:27017/bookmyland";
    await mongoose.connect(mongourl);
}

// const initdb=async()=>{
//     await Listing.deleteMany({});
//     await Listing.insertMany(initData.data);
//     console.log("DB initialized with sample data");
//   //  mongoose.connection.close();
// }
// initdb();  

const initdb = async () => {
    await Listing.deleteMany({});
    // Convert image object to string for each listing
    const normalizedData = initData.data.map(listing => ({
        ...listing,
        image: typeof listing.image === 'object' ? listing.image.url : listing.image
    }));
    await Listing.insertMany(normalizedData);
    console.log("DB initialized with sample data");
    // mongoose.connection.close();
};
initdb();