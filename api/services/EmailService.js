var nodemailer = require("nodemailer");




var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'oscarvegar@gmail.com',
        pass: 'boniboni'
    }
});

exports.sendEmail = function(options){
    smtpTransport.sendMail({  //email options
       from: "Notificación ✔ YoPlanner <oscarvegar@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
       to: "daniel.muller@yoplanner.com,oscarman2001@hotmail.com", // receiver
       subject: options.subject,//"RFP Recibida ✔", // subject
       text: options.text // body
        
    }, function(error, info){  //callback
       if(error){
           console.log(error);
       }else{
           console.log("Message sent: " + info.response);
       }

       //smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });    
    
};
