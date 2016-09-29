/**
* Salon.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        rfp:{
            model:'rfp'
        },
        tipoSalon:{
        	model:'montaje'
        },
        tipoEvento:{
        	model:'tipoEvento'
        },
        fecha:'date'
    }
};

