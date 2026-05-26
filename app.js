if(process.env.NODE_ENV!="production"){
   require('dotenv').config();
}



const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStategy=require("passport-local");
const User=require("./models/user.js");


const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");



const dbURL=process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect(dbURL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const sessionOptions=
    {
       // store:store,
        secret:process.env.SECRET,
        resave:false,
        saveUninitialized:true,
        cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        },
    };




// const store=MongoStore.create({
//     mongoUrl:dbURL,
//     crypto:{
//     secret:"mysuperscretcode",
//   },
//   touchAfter:24*3600,
// });
// store.on("error",(err)=>{
//     console.log("Error in mongo session store",err);
// });




app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// app.get("/",(req,res)=>{
//     res.send("working");
// });


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
   res.locals.error=req.flash("error");
   res.locals.curUser=req.user;
    next();
})

// app.get("/demouser",async(req,res)=>{
//    let fakeUser=new User({
//     email:"stu@gmail.com",
//     username:"dlet-st"
//    })
//   let registeredUser=await User.register(fakeUser,"helloworld");
//   res.send(registeredUser);
// })



// using this for listings
app.use("/listings",listingsRouter);

// using this for listings Reviews
app.use("/listings/:id/reviews/",reviewsRouter);

app.use("/",userRouter);
                                                                    
   

//err function for all which i snot define
app.use((req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Some thing went wrong"}=err;
      res.status(statusCode).render("error.ejs",{err});
   //res.status(statusCode).send(message);
});


app.listen(8000,()=>{
    console.log("server listing to port 8000");
})