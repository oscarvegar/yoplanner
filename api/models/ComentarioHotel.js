/**
* ComentarioHotel.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    hotel: {
      model: 'recinto'
    },
    user: {
      model: 'user'
    },
    text: {
      type: 'string',
      required: true
    },
    title: {
      type: 'string',
      required: true
    },
    likes: {
      type: 'array',
      defaultsTo: []
    },
    replies: {
      type: 'array',
      defaultsTo: []
    }
  }
};
