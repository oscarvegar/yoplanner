/**
 * ComentarioHotelController
 *
 * @description :: Server-side logic for managing Comentariohotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getComentarios: function (req, res) {
		var id = req.param('id');
		var offset = req.param('offset');
		ComentarioHotel.find({hotel: id}).populate('user').limit(10).skip(offset).then(function (comentarios) {
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
	},

	like: function (req, res) {
		var comment = req.param('comentario');
		for (var i in comment.likes) {
			if (comment.likes[i] == req.user.id) {
				return res.json({error: true, message: 'Ya haz agradecido a este comentario.'});
			}
		}
		comment.likes.push(req.user.id);
		ComentarioHotel.update({id: comment.id}, comment).then(function (comentario) {
			console.log(comentario);
			return res.json(comentario[0]);
		}).catch(console.log);
	}

};
