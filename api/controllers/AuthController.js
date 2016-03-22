/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');
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

        return res.send({
          message: 'login successful'
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
  		return res.json(1)
  	}else{
  		return res.json(401,{})

  	}
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