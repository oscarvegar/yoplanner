/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    comentarios: {
      collection: 'comentariohotel',
      via: 'user'
    },
    customers: {
      collection: 'customer',
      via: 'user'
    },
    notificacionesRecibidas: {
      type: 'array',
      defaultsTo: []
    },
    favoritos: {
      type: 'array',
      defaultsTo: []
    },

    toJSON: function() {
      var obj = this.toObject();
      obj.rango = obj.comentarios ? Math.floor(obj.comentarios.length / 10) : 0;
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }

};
