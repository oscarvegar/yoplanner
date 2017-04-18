/**
 * ListaCustomController
 *
 * @description :: Server-side logic for managing Listacustoms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	renderList: function (req, res) {
		var id = req.param('id');
		ListaCustom.findOne(id).populateAll().then(function(data) {
			return res.view('iframes/custom-list', {
				list: data.hoteles,
				name: data.name,
				bg: data.bg ? data.bg : false,
				id: data.id
			});
		}).catch(function(err) {
			console.log(err);
		  return res.view('homepage');
		});
	}

};
