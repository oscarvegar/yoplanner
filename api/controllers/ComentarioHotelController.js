/**
 * ComentarioHotelController
 *
 * @description :: Server-side logic for managing Comentariohotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getByHotel: function (req, res) {
		var id = req.param('id');
		ComentarioHotel.find({hotel: id}).then(function (comentarios) {
			return res.json({message: 'Comentarios de hotel: ' + id, comentarios: comentarios});
		}).catch(function (err) {
			return res.json(500, {message: 'Server error'});
		});
	}
};
