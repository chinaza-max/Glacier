const express=require("express")
const passport=require('passport')
const router=express.Router();


//const bodyParser=require("body-parser")

const app=express();

//app.use(express.json());

const methodOverride=require("method-override")
app.use(methodOverride('_method'))

//app.use(bodyParser.urlencoded({extended:false}))



router.post('/login', (req, res, next)=>{
    passport.authenticate("local-login",(err, user, info) =>{
        if (err) {
            return res.status(400).json({express:err})
        }
      //persistent  login
      console.log("user")
      console.log(user)
        req.logIn(user,(err)=>{
            if (err) {
                console.log(err)
                return res.status(500).json({express:err})
            }

            user.isAuthenticated=true;
            console.log(user)
            return res.status(200).json({express:user})
        })
    })(req, res, next);
});


router.post('/signup', (req, res, next)=>{
    passport.authenticate("local-signUp",(err, user, info) =>{
        if (err) {
            return res.status(400).json({express:err})
        }
       
            return res.status(200).json({express:user})
    
    })(req, res, next)
})


router.get("/auth/google",passport.authenticate("google-signUp",{
    scope:  [ 'profile', 'email' ]
}))





router.get("/auth/google/callback",(req, res, next)=>{
    passport.authenticate("google-signUp",(err, user, info) =>{
    
        if (err) {
            return res.status(400).json({express:err})
        }
    
            user.isAuthenticated=true;
            return res.redirect(301,`http://localhost:3000/home/${user._id}`)
        
    })(req, res, next)
})
//,"https://www.googleapis.com/auth/contacts" 
/*
router.get("/auth/google/callback",(req, res, next)=>{
    passport.authenticate("google-signUp",(err, user, info) =>{
    
        console.log(user._id)
        if (err) {
            return res.status(400).json({express:err})
        }
            user.isAuthenticated=true;
            return res.status(200).json({express:user._id})
    
    })(req, res, next)
})
*/

module.exports=router;