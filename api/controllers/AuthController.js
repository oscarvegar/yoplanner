/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');
var uuid = require('uuid');
module.exports = {

  login: function (req, res) {
  	var user = req.allParams();
  	user.id = user.username;
  	req.login(user,function(err){
  		if (err) {
  			console.error(err)
  			res.json(500,err)
  		}
        return res.send({
          message: 'login successful'
        });
  	});

  },

  process: function(req, res){
      	console.log("entra a process");

    passport.authenticate('local', function(err, user, info) {
    	console.log("user",user)
    	if ((err) || (!user)) {
        return res.json(405,{
        	message: 'login failed'
        });
        res.json(405,err);
      	}
      	req.logIn(user, function(err) {
        if (err) return res.send(err);
        req.session.authenticated = true;
        console.log("logged user",user)
        var sessuid = uuid.v4();
        User.update(user,{sessuid:sessuid}).then(function(data){})
          return res.send({
            message: 'login successful',
            user: req.user
          });

      });
    })(req, res);
  },
  logout: function (req,res){
  	console.log("logout");
    req.logout();
    res.json(1);
  },
  hasSession: function(req,res){
  	console.log("req.session.authenticated",req.user)
  	if(req.user){
      User.findOne(req.user.id).then(function(usres){
        return res.json(usres.sessuid)
      })

  	}else{
  		return res.json(401,{})

  	}
  },

  getLoggedUser: function (req, res) {
    return res.json(req.user ? req.user : {});
  }

 }

module.exports.blueprints = {

  // Expose a route for every method,
  // e.g.
  // `/auth/foo` => `foo: function (req, res) {}`
  actions: true,

  // Expose a RESTful API, e.g.
  // `post /auth` => `create: function (req, res) {}`
  rest: true,

  // Expose simple CRUD shortcuts, e.g.
  // `/auth/create` => `create: function (req, res) {}`
  // (useful for prototyping)
  shortcuts: true

};
