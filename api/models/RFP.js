'use strict';
/**
* RFP.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        fechaInicial:"date",
        fechaFinal:"date",
        configuracionHabitaciones:{
            collection: 'habitacion',
            via: 'rfp'
        },
        salones:{
            collection: 'salon',
            via: 'rfp'
        },
        recintos:{
            collection: 'recinto',
            via: 'rfps'
        },
        createdBy:{
            model:'user'
        },
        customer: {
          model: 'customer'
        }

    },
    beforeCreate : function(rfp,next){
        rfp.count = 1;
        rfp.status = {id:1,description:"PROSPECTO",color:"bg-green-400"};
        next();
    },
    afterCreate : function(rfp,next){
      console.log('After-create');
      /*
        var options = {};
        options.to = rfp.email,
        options.subject = "RFP Recibida ✔";
        EmailService.sendCustomer(options, rfp);
        */
        next();
    }
};
