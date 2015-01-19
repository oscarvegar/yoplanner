var nodemailer = require("nodemailer");




var smtpTransport = nodemailer.createTransport({
    //service: 'Gmail',
    secure:true, 
    host: "just14.justhost.com",
    auth: {
        user: 'grupos@yoplanner.com',
        pass: 'groupyp$0123'
    }
});

exports.sendEmail = function(options){
    smtpTransport.sendMail({  //email options
       from: "Notificación ✔ YoPlanner <grupos@yoplanner.com>", // sender address.  Must be the same as authenticated user if using Gmail.
       to: options.to,// receiver
       bcc: "daniel.muller@yoplanner.com,oscarman2001@hotmail.com",
       subject: options.subject,//"RFP Recibida ✔", // subject
       text: options.text, // body
       html: options.html
    }, function(error, info){  //callback
       if(error){
           console.log(error);
       }else{
           console.log("Message sent: " + info.response);
       }

       //smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });    
    
};
