require('dotenv').config(); 
const nodemailer=require('nodemailer');


const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.PASSWORD,
        pass: process.env.EMAIL
    }
});


const sendMail=(email,subject,text,id,cb)=>{
    const mailOptions={
        from:"brightmind.lmt@gmail.com",
        to:email,
        subject,
        text,
        html:` click  <a href=http://localhost:3000/resetPassword/${id}>reset</a>`
    }
    
    transporter.sendMail(mailOptions,function(err,data){
        console.log(email)
            if(err){
                console.log(err)
                cb(err,null)
            }
            else{
                cb(null,data)
            }
    });
    
}

module.exports=sendMail;


