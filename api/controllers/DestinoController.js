/**
 * DestinoController
 *
 * @description :: Server-side logic for managing Destinoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	addNew: function (req, res) {
		var datosDestino = req.param('datos');
		Destino.create(datosDestino).then(function(data) {
		  return res.json(data);
		}).catch(console.log);
	},

	getAll: function (req, res) {
		Destino.find({}).then(function(data) {
		  return res.json({destinos: data});
		}).catch(console.log);
	},

	edit: function (req, res) {
		var datos = req.param('destino');
		Destino.update({id: datos.id}, datos).then(function(data) {
		  return res.json(data[0]);
		}).catch(console.log);
	},

	deleteDestino: function (req, res) {
		var id = req.param('id');
		Destino.destroy({id: id}).then(function(data) {
		  return res.json(data[0]);
		}).catch(console.log);
	},

	getById: function (req, res) {
		var id = req.param('id');
		Destino.findOne({id: id}).then(function(data) {
		  return res.json(data);
		}).catch(function(err) {
		  return res.json(500, {err: err});
		});
	}

};
