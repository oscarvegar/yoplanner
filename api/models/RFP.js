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
        }

    },
    beforeCreate : function(rfp,next){
        rfp.count = 1;
        rfp.status = {id:1,description:"PROSPECTO",color:"bg-green-400"};
        next();
    },
    afterCreate : function(rfp,next){
        var options = {};
        options.to = rfp.email,
        options.subject = "RFP Recibida ✔";
        options.html = "<html><br>Buen Día! \
        <br><br> \
        Muchas gracias por utilizar <b>Yo Planner</b>, hemos recibido tu solicitud y pronto nos estaremos poniendo en contacto contigo. \
        <br><br> \
        Para ver tu propuesta o imprimir da click en el siguiente enlace: \
        <br><br>\
        http://htmltopdfapi.com/querybuilder/api.php?url=http://rfp.yoplanner.com/rfp/print/"+rfp.id+
        "<br><br>Saludos,<br><img src='http://rfp.yoplanner.com/img/firma.png'></html>";
        EmailService.sendEmail(options);
        next();
    }
};
