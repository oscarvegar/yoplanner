/**
* Recinto.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    //autoPK: false,
    attributes: {

        id: {
            type: 'integer',
            primaryKey: true,
            required: true
        },
        amenities:{
            collection:'Amenity'
        },
        salones:{
            collection:"SalonRecinto"
        },
        
        rfps: {
            collection: 'rfp',
            via: 'recintos',
            //dominant:true
        },
        infoExtra: {
            model: 'infoExtraRecinto'
            //via: 'recinto',
        }
    }
};

