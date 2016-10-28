/**
 * CustomerController
 *
 * @description :: Server-side logic for managing Customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getByUser: function (req, res) {
		if (!req.user.id) {
			return res.json({error: true});
		}
		Customer.find({user: req.user.id}).then(function (customers) {
			return res.json(customers);
		}).catch(console.log);
	},

	addCustomer: function (req, res) {
		var data = req.allParams();
		data.user = req.user.id;
		Customer.create(data).then(function (customer) {
			return res.json({message: 'Customer creado', customer: customer});
		}).catch(console.log);
	},

	autocompleteCustomers: function (req, res) {
		var id = req.user.id ? req.user.id : '';
		var nombre = req.param('nombre');
		Customer.find({user: id, nombreCliente: nombre}).then(function(data) {
		  return res.json({customers: data});
		}).catch(function(err) {
			console.log(err);
		  return res.json({customers: []});
		});
	}
};
