const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys=require('../../keys.js');
const User = require('../../models/user.js');

  passport.serializeUser(function(user, done) {

    let savedUser = new User({
      userName:user.displayName,
      userEmail:user._json.email,
      googleId:user.id
    });
    done(null, savedUser);
 });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

passport.use(new GoogleStrategy({
    clientID: keys.googleauth.clientId,
    clientSecret: keys.googleauth.clientSecret,
    callbackURL: "http://localhost:8080/api/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
      console.log("user logged in: name:"+profile.displayName);

      User.findOne({googleId:profile.id}).then((currentUser)=>{
          if(currentUser){
            //user already existed in database
            console.log("User already exists in database:" + currentUser);
          }else{
            // if user is not in database then save user profile data to database
            new User({
              userName:profile.displayName,
              userEmail:profile._json.email,
              googleId:profile.id
            }).save().then((newUser)=>{
              // new User data is saved to the database
              console.log("new User created" + newUser);
            });
          }
      });


    return done(null,profile);
  }
));


router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),(req, res) => {
    // Successful authentication, redirect home.

    res.redirect('http://localhost:3000/');
  });

  router.get('/user',(req,res)=>{
   
   if(req.user!=null){
    User.findOne({googleId:req.user.googleId}).then((currentUser)=>{
      res.send(currentUser);
    });
   }

});

router.post('/user/:id',(req,res)=>{


  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`
        });
      } else{
        res.send(data);
      } 
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });

  

});

  router.get('/logout',(req,res)=>{
      req.session=null;
      req.logOut();
      res.redirect('/');


  });

  module.exports = router;