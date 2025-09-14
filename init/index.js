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

const initdb=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("DB initialized with sample data");
  //  mongoose.connection.close();
}
initdb();