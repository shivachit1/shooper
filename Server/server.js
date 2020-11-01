const express = require('express');
const path = require('path');

const mongoose= require('mongoose');
const keys=require('../server/keys');
const passport = require('passport');
const cookieSession=require('cookie-session');
const authRoutes= require('./routes/api/authRoutes');
const businessRoutes = require('./routes/api/businessRoutes');

const productsRoutes= require('./routes/api/myProductsRoutes');
const ordersRoutes= require('./routes/api/ordersRoutes');
const paymentRoutes = require('./routes/api/paymentRoutes');
const PORT = process.env.PORT || 8080;
const cors = require('cors');

// connection to mongodb atlas
mongoose.connect(keys.mongodb.mongoURI, {useNewUrlParser:true
      ,useUnifiedTopology: true }).then(
        () => { 
            console.log("Database connected");
        },
        err => { 
            /** handle initial connection error */ 
            console.log("Error in database connection. ", err);
        }
    );

const app = express();



app.use((req, res, next) => {
    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.header('crossorigin',true);
  // Pass to next layer of middleware
  next();
  });

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors());

app.use(cookieSession({
    name:'rentmenow-session',
    keys:['key1','key2']
}));
app.use(passport.initialize());
app.use(passport.session());


//get to home page
app.get('/',(req,res)=>{
    if(req.user){
        res.send(`You are logged in.${req.user.userName}`);
    }else{
        res.send('Welcome to home Page');
    }
});

// set Static Folder
//app.use(express.static(path.join(__dirname,'public')));



app.use('/api/auth',authRoutes);
app.use('/api/business',businessRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/orders',ordersRoutes);
app.use('/api/payment',paymentRoutes);



app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));