var nodemailer = require("nodemailer");
var moment = require('moment');
var ejs = require('ejs');
var fs = require('fs');
var smtpTransport = nodemailer.createTransport({
   //service: 'Gmail',
   //secure:true,
   //host: "just14.justhost.com",
   service: 'Mailgun',
   auth: {
      user: 'postmaster@sandboxafabb67e170442ddba9d656d539a0446.mailgun.org', // mailgun username
      pass: 'a58817cd70915b93ed22918efe4dc19e' // mailgun password
   }


});

module.exports = {

   sendHotel: function(options, rfp, user, logoagencia) {
      var template = fs.readFileSync(require('path').resolve(sails.config.appPath, 'views/emailTemplates/hotelnew.ejs'), 'utf8');
      var htmlfinal = ejs.render(template, {
         rfp: rfp,
         user: user,
         moment: moment,
         logo: logoagencia
      });
      smtpTransport.sendMail({
         from: "Notificación ✔ YoPlanner <grupos@yoplanner.com>",
         //from: "Notificación ✔ "+user.empresa+" <" + user.username + ">",
         to: options.to,
         bcc: "oscarman2001@hotmail.com",
         subject: 'RFP Recibida ✔ | Hotel',
         html: htmlfinal
      }, function(error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log("Mensaje enviado: " + info.response);
         }
      });
   },

   sendCustomer: function(options, rfp, user) {
      var template = fs.readFileSync(require('path').resolve(sails.config.appPath, 'views/emailTemplates/customer.ejs'), 'utf8');
      var htmlfinal = ejs.render(template, {
         rfp: rfp,
         user: user,
         moment: moment
      });
      smtpTransport.sendMail({
         from: "Notificación ✔ YoPlanner <grupos@yoplanner.com>",
         //from: "Notificación ✔ "+user.empresa+" <" + user.username + ">",
         to: options.to,
         bcc: "oscarman2001@hotmail.com",
         subject: 'RFP Recibida ✔ | Customer',
         html: htmlfinal
      }, function(error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log("Mensaje enviado: " + info.response);
         }
      });
   },

   sendPlanner: function(options, rfp, user, logoagencia) {
      var template = fs.readFileSync(require('path').resolve(sails.config.appPath, 'views/emailTemplates/plannernew.ejs'), 'utf8');
      var htmlfinal = ejs.render(template, {
         rfp: rfp,
         moment: moment,
         user: user,
         logo: logoagencia
      });
      smtpTransport.sendMail({
         from: "Notificación ✔ YoPlanner <grupos@yoplanner.com>",
         //from: "Notificación ✔ "+user.empresa+" <" + user.username + ">",
         to: user.username,
         //to: 'arcaniteamp@gmail.com',
         bcc: "oscarman2001@hotmail.com",
         subject: 'RFP Recibida ✔ | Planner',
         html: htmlfinal
      }, function(error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log("Mensaje enviado planner: " + info.response);
         }
      });
   },

   sendTest: function(options) {
      smtpTransport.sendMail({
         from: options.from,
         to: options.to,
         bcc: "oscarman2001@hotmail.com",
         subject: 'RFP TEST ✔ | Planner',
         html: "<h1>Hola test</h1>"
      }, function(error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log("Mensaje enviado planner: " + info.response);

         }
      });
   },

   sendActivacion: function (options, user) {
     var template = fs.readFileSync(require('path').resolve(sails.config.appPath, 'views/emailTemplates/activacion.ejs'), 'utf8');
     var htmlfinal = ejs.render(template, {
        user: user
     });
     smtpTransport.sendMail({
        from: "Notificación ✔ YoPlanner",
        //from: "Notificación ✔ "+user.empresa+" <" + user.username + ">",
        to: user.username,
        //to: 'arcaniteamp@gmail.com',
        bcc: "oscarman2001@hotmail.com",
        subject: 'Acceso a plataforma YoPlanner Solutions',
        html: htmlfinal
     }, function(error, info) {
        if (error) {
           console.log(error);
        } else {
           console.log("Mensaje enviado a usuario activado: " + info.response + " EMAIL: " + user.username);
        }
     });
   }

}
