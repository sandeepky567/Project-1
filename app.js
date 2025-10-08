const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utlis/wrapasync.js');
const ExpressError = require('./utlis/expresserror.js');
const { listingSchema, reviewSchema } = require('./schema.js'); // Combined schema import
const Review = require('./models/review.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const { saveRedirectUrl, isOwner, isLoggedIn, isAuthor } = require('./middleware.js');
const multer = require('multer');
require('dotenv').config();

// --- MULTER SETUP (Used for parsing multipart/form-data) ---
const upload = multer();

// --- DATABASE CONNECTION ---
const dburl = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(dburl);
}
main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
});

// --- EXPRESS SETUP & MIDDLEWARE ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true })); // Handles standard form data
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

// --- SESSION & FLASH SETUP ---
const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET || "mysupersecret" // Use environment variable for secret
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in mongo session");
});
const sessionOptions = {
    store, // Use MongoStore
    secret: process.env.SECRET || "mysuppersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    },
};
app.use(session(sessionOptions));
app.use(flash());

// --- PASSPORT AUTHENTICATION ---
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --- GLOBAL RES.LOCALS ---
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

// --- JOI VALIDATION MIDDLEWARE ---
const validateListing = (req, res, next) => {
    // Debugging line removed for production code
    // console.log("Data received for validation:", req.body); 
    let { error } = listingSchema.validate(req.body);
    if (error) {
        // Mongoose/Joi errors often contain details path
        const msg = error.details.map(el => el.message).join(','); 
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

// ====================================================================
// --- ROUTES ---
// ====================================================================

app.get('/',(req,res)=>{
   res.render("listings/dashboard.ejs");
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
    const listing=await Listing.findById(id).populate({path:'reviews', populate: {path: 'author',select: 'username'}}).populate("owner");
    if(!listing){
        req.flash('error','Cannot find that listing!');
        return res.redirect('/listings');
    }
    res.render("listings/show.ejs",{listing});
}));


//create route
app.post('/listings',isLoggedIn,validateListing,
  
    wrapAsync(async (req,res,next)=>{

    
  const newlisting=new Listing(req.body.listing);
  newlisting.owner=req.user._id;
  await newlisting.save();
  req.flash('success','Successfully made a new listing');
  res.redirect(`/listings`);

}));

//edit route
app.get('/listings/:id/edit',
    isLoggedIn,
     isOwner
     ,wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
     if(!listing){
        req.flash('error','Cannot find that listing!');
        res.redirect('/listings');
    }
    res.render("listings/edit.ejs",{listing});
}));

//update route
app.put('/listings/:id',
    isLoggedIn,
     isOwner,
    wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid Listing Data");
    }
    const {id}=req.params; 
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
     req.flash('success','Successfully updated a listing');
    res.redirect(`/listings`);
 }));

   
 //delete route
     app.delete('/listings/:id',
        isLoggedIn,
     isOwner,wrapAsync(async (req,res)=>{
         const {id}=req.params;
         await Listing.findByIdAndDelete(id);
          req.flash('success','Successfully deleted a listing');
         res.redirect('/listings');
     }));

  
// --- USER AUTH ROUTES ---

// Signup Route (Form)
app.get('/signup', (req, res) => {
    res.render('users/signup.ejs');
});

// Signup Route (POST)
app.post('/signup', wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new User({ username, email });
        const registereduser = await User.register(newuser, password);
        
        req.login(registereduser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to BookMyLand');
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}));

// Login Route (Form)
app.get('/login', (req, res) => {
    res.render('users/login.ejs');
});

// Login Route (POST)
app.post('/login', saveRedirectUrl, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.redirectUrl || '/listings';
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
});

// Logout Route
app.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) { next(err); }
        req.flash('success', 'Goodbye!');
        res.redirect('/listings');
    });
});

// --- REVIEW ROUTES ---

// Reviews Create Route (POST)
app.post('/listings/:id/reviews', isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let review = new Review(req.body.review);
    review.author = req.user._id;

    listing.reviews.push(review);

    await review.save();
    await listing.save();
    req.flash('success', 'Review added successfully!'); // Added flash message
    res.redirect(`/listings/${listing._id}`);
}));

// Delete Review Route
app.delete('/listings/:id/reviews/:reviewId', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully!'); // Added flash message
    res.redirect(`/listings/${id}`);
}));

// --- ERROR HANDLING ---

// 404 Catch-all Route
app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("server started at port 8080");
});