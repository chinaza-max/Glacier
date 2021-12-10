//const  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const keys = require("./keys")
const User=require("../mongodb/schema/userSchema")

/*
console.log( keys.GOOGLE.clientID)
console.log( keys.GOOGLE.clientSecret)
*/

//http://localhost:5000/auth/google/callback
//   proxy: true
//    scope:["https://www.googleapis.com/auth/contacts"]
const googleLocalStrategy=new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "http://localhost:5000/auth/google/callback",
   
  },
  async(req,token, tokenSecret, profile, done)=>{
    
     try{
    
        User.findOne({password:profile.id}).then( async(resultUser, err)=>{
            if(err){
                return done(err,null)
            } 
            else if(resultUser){
              return done(null,resultUser)
            } 
            else{
              console.log(" new new new")
                const user=new User()
                user.name=profile.name.givenName,
                user.password=profile.id,
                user.email=profile.email
                user.save(function(err,data){
                    if(err){
                        return done(err,null)
                    }
                    else{
                        return done(null,data)
                    }
                })
            }
        })
     }
     catch(e){
        console.log(e)
     }
   //  return done(null, profile);
  }
)



module.exports=googleLocalStrategy;