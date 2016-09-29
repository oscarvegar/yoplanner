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
		User.findOne({id: id}).then(function(data) {
			EmailService.sendActivacion({}, data);
		}).catch(function(err) {
		  return res.json(500, {err: err});
		});
	}

};
