/**
* Recinto.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    //autoPK: false,
    attributes: {
        
        rfps: {
            collection: 'rfp',
            via: 'recintos',
            //dominant:true
        },
        salones: {
            collection: 'salonRecinto'
        },
        infoExtra: {
            model: 'infoExtraRecinto'
            //via: 'recinto',
        }
    }
};

