/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var http = require('request');

module.exports = {

	registerAprove: function (req, res) {
		var data = req.param('data');
		User.create(data).then(function(data) {
			return res.json(data);
		}).catch(function(err) {
			console.log(err);
		  return res.json(500, {err: err});
		});
	},

	sendMailActivacion: function (req, res) {
		var id = req.param('id');
		var pass = req.param('pass');
		User.findOne({id: id}).then(function(data) {
			console.log('Usuario enviando mail', data, pass);
			data.noCryptPass = pass;
			EmailService.sendActivacion({}, data, pass);
		}).catch(function(err) {
		  return res.json(500, {err: err});
		});
	},

	registerLinkedin: function (req, res) {
		var code = req.param('code');
		var state = req.param('state');
		console.log('LINKEDIN -- code:', code, ' -- state: ', state);
		return res.json({code: code});
		http.post({
			url: 'https://www.linkedin.com/oauth/v2/accessToken',
			form: {
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: 'http://localhost:1337/user/registerLinkedin',
				client_id: '78w80b3w1y1la8',
				client_secret: 'vqpMd1GRbdn2fenT'
			}
		}, function (err, resp, body) {
			console.log('Body: ', body);
			return res.json({code: code, state: state, body: body	});
		});
	},

	getLinkedinToken: function (req, res) {
		var params = req.allParams();
		http.post({
			url: 'https://www.linkedin.com/oauth/v2/accessToken',
			form: {
				grant_type: 'authorization_code',
				code: params.code,
				redirect_uri: params.redirectUri,
				client_id: params.clientId,
				client_secret: 'vqpMd1GRbdn2fenT'
			}
		}, function (err, resp, body) {
			if (err) {
				return res.json(500, {err: err});
			}

			//Obtener info del user
			var resLinkedin = JSON.parse(body);
			http.get({
				url: 'https://api.linkedin.com/v1/people/~?oauth2_access_token='+resLinkedin.access_token+'&format=json',
			}, function (err2, resp2, body2) {
				//Obtener email del user
				http.get({
					url: 'https://api.linkedin.com/v1/people/~:(id,num-connections,picture-url,email-address)?oauth2_access_token='+resLinkedin.access_token+'&format=json'
				}, function (err3, resp3, body3) {
					return res.json({body: body2, body2: body3});
				});
			});
		});
	}

};
