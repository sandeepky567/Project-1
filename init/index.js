const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// --- 1. Database Connection and Initialization Start ---

main()
    .then(() => {
        console.log("Connected to DB successfully! ✅");
        // CALL initdb() HERE to ensure the DB connection is ready
        initdb();
    })
    .catch((err) => {
        console.log("Error connecting to DB:", err);
    });

// async function main() {
//     const mongourl = "mongodb://127.0.0.1:27017/bookmyland";
//     await mongoose.connect(mongourl);
// }
const dburl = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(dburl);
}

// --- 2. Database Initialization Function ---
const initdb = async () => {
    // 1. Delete ALL previous data from the collection
    await Listing.deleteMany({});
    console.log("Old data deleted.");
    initData.data = initData.data.map((obl) => ({ ...obl, owner: "68de07885631d1a2a5b354e5" }));

    // 2. Prepare/Normalize the data for insertion
    const normalizedData = initData.data.map(listing => ({
        ...listing,
        // Safely extract the URL string from the image object
        image: (typeof listing.image === 'object' && listing.image !== null) 
               ? listing.image.url 
               : listing.image
        // NOTE: If your Listing model requires an 'owner' field, you must add it here, e.g.:
        // owner: 'YOUR_USER_OBJECT_ID_HERE', 
    }));

    // 3. Insert the new, normalized sample data
    await Listing.insertMany(normalizedData);
    console.log("New sample data inserted. DB initialized successfully! ✨");
    
    // Optional: Close the connection if this script's only job is seeding
    // mongoose.connection.close(); 
};

// Removed the standalone initdb() call from the end to fix the timing issue.