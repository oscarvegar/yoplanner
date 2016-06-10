/**
 * ComentarioHotelController
 *
 * @description :: Server-side logic for managing Comentariohotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getComentarios: function (req, res) {
		var id = req.param('id');
		ComentarioHotel.find({hotel: id}).populate('user').then(function (comentarios) {
			return res.json({comentarios: comentarios});
		}).catch(console.log);
	},

	postComentario: function (req, res) {
		var comentarioParams = req.allParams();
		comentarioParams.user = req.user.id;
		ComentarioHotel.create(comentarioParams).then(function (comentario) {
			ComentarioHotel.findOne({id: comentario.id}).populate('user').then(function (comentario_final) {
				console.log('Comentario creado', comentario_final);
				return res.json({comentario: comentario_final});
			}).catch(console.log);
		}).catch(console.log);
	}
};
