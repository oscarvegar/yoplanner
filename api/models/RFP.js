/**
* RFP.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  },
    afterCreate : function(rfp,next){
        var options = {};
        options.subject = "RFP Recibida ✔";
        options.text = JSON.s;
        EmailService.sendEmail(options);
        next();
        
    }
};

