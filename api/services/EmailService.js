var nodemailer = require("nodemailer");
var moment = require('moment');
var ejs = require('ejs');
var fs = require('fs');
var smtpTransport = nodemailer.createTransport({
    //service: 'Gmail',
    secure:true,
    host: "just14.justhost.com",
    auth: {
        user: 'grupos@yoplanner.com',
        pass: 'groupyp$0123'
    }
});

module.exports = {

  sendHotel: function (options, rfp, user) {
    var template = fs.readFileSync(require('path').resolve(sails.config.appPath, 'views/emailTemplates/hotel.ejs'), 'utf8');
    var htmlfinal =  ejs.render(template, {rfp: rfp, user: user, moment: moment});
    smtpTransport.sendMail({
     from: "Notificación ✔ YoPlanner <grupos@yoplanner.com>",
     to: options.to,
     bcc: "oscarman2001@hotmail.com",
     subject: 'RFP Recibida ✔ | Hotel',
     html: htmlfinal
   }, function(error, info){
     if(error){
       console.log(error);
     }else{
       console.log("Mensaje enviado: " + info.response);
     }
    });
  },

  sendCustomer: function (options, rfp, user) {
    var template = fs.readFileSync(require('path').resolve(sails.config.appPath, 'views/emailTemplates/customer.ejs'), 'utf8');
    var htmlfinal =  ejs.render(template, {rfp: rfp, user: user, moment: moment});
    smtpTransport.sendMail({
     from: "Notificación ✔ YoPlanner <grupos@yoplanner.com>",
     to: options.to,
     bcc: "oscarman2001@hotmail.com",
     subject: 'RFP Recibida ✔ | Customer',
     html: htmlfinal
   }, function(error, info){
     if(error){
       console.log(error);
     }else{
       console.log("Mensaje enviado: " + info.response);
     }
    });
  },

  sendPlanner: function (options, rfp, user) {
    console.log('RFP', rfp);
    var template = fs.readFileSync(require('path').resolve(sails.config.appPath, 'views/emailTemplates/planner.ejs'), 'utf8');
    var htmlfinal =  ejs.render(template, {rfp: rfp, moment: moment});
    smtpTransport.sendMail({
     from: "Notificación ✔ YoPlanner <grupos@yoplanner.com>",
     to: user.username,
     bcc: "oscarman2001@hotmail.com",
     subject: 'RFP Recibida ✔ | Planner',
     html: htmlfinal
   }, function(error, info){
     if(error){
       console.log(error);
     }else{
       console.log("Mensaje enviado planner: " + info.response);
     }
    });
  }
};
