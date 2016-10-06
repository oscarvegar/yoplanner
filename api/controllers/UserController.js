/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
	}

};
