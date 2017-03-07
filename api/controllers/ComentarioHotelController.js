/**
 * ComentarioHotelController
 *
 * @description :: Server-side logic for managing Comentariohotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var http = require('request');

module.exports = {

	getComentarios: function (req, res) {
		var id = req.param('id');
		var page = req.param('page');
		ComentarioHotel.count({hotel: id}).then(function (cuantos) {
			var count_comentarios = cuantos;
			ComentarioHotel.find({hotel: id}).populate('user').paginate({page: page, limit: 10}).then(function (comentarios) {
				return res.json({comentarios: comentarios, count: count_comentarios});
			}).catch(console.log);
		}).catch(console.log);
	},

	getComentariosDestino: function (req, res) {
		var id = req.param('id');
		var page = req.param('page');
		ComentarioHotel.count({destino: id}).then(function (cuantos) {
			var count_comentarios = cuantos;
			ComentarioHotel.find({destino: id}).populate('user').paginate({page: page, limit: 10}).then(function (comentarios) {
				return res.json({comentarios: comentarios, count: count_comentarios});
			}).catch(console.log);
		}).catch(console.log);
	},

	postComentarioDestino: function (req, res) {
		var comentarioParams = req.allParams();
		comentarioParams.user = req.user.id;
		ComentarioHotel.create(comentarioParams).then(function (comentario) {
			ComentarioHotel.findOne({id: comentario.id}).populate('user').then(function (comentario_final) {
				console.log('Comentario creado', comentario_final);
				http.post('http://localhost:1337/api/notificacion/sendNotificationHotelComment', {
					form: {
						comentario: comentario_final
					}
				}, function (err, httpResponse, body) {
					if (err) {
						 console.log('ERROR NOTI HOTEL COMMENT:', err);
					} else {
						console.log('Conectado con el server para mandar notificacion', body);
					}
				});
				return res.json({comentario: comentario_final});
			}).catch(console.log);
		}).catch(console.log);
	},

	postComentario: function (req, res) {
		var comentarioParams = req.allParams();
		comentarioParams.user = req.user.id;
		ComentarioHotel.create(comentarioParams).then(function (comentario) {
			ComentarioHotel.findOne({id: comentario.id}).populate('user').then(function (comentario_final) {
				console.log('Comentario creado', comentario_final);
				http.post('http://localhost:1337/api/notificacion/sendNotificationHotelComment', {
					form: {
						comentario: comentario_final
					}
				}, function (err, httpResponse, body) {
					if (err) {
						 console.log('ERROR NOTI HOTEL COMMENT:', err);
					} else {
						console.log('Conectado con el server para mandar notificacion', body);
					}
				});
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
	},

	addReply: function (req, res) {
		var id = req.param('id');
		var text = req.param('replytext');
		ComentarioHotel.findOne({id: id}).then(function (comentario) {
			var reply = {
				text: text,
				user: req.user.id,
				avatar: 'http://admin.yoplanner.com'+req.user.avatar,
				userobj: req.user,
				name: req.user.name || req.user.username,
				createdAt: new Date().toISOString()
			};
			if (!comentario.replies) {
				comentario.replies = [reply];
			} else {
				comentario.replies.push(reply);
			}
			ComentarioHotel.update({id: id}, comentario).then(function (com) {
				console.log('Anadida respuesta a comentario...');
				return res.json(com[0]);
			}).catch(console.log);
		}).catch(console.log);
	},

	deleteReply: function (req, res) {
		var id = req.param('id');
		var reply = req.param('reply');
		ComentarioHotel.findOne({id: id}).then(function (comentario) {
			for (var i = 0; i < comentario.replies.length; i++) {
				if (comentario.replies[i].user == reply.user && comentario.replies[i].text == reply.text && comentario.replies[i].createdAt == reply.createdAt) {
					comentario.replies.splice(i, 1);
					break;
				}
			}
			ComentarioHotel.update({id: id}, comentario).then(function (com) {
				console.log('Borrando respuesta...');
				return res.json(com[0]);
			}).catch(console.log);
		}).catch(console.log);
	},

	editReply: function (req, res) {
		var id = req.param('id');
		var reply = req.param('reply');
		var newtext = req.param('newtext');
		ComentarioHotel.findOne({id: id}).then(function (comentario) {
			for (var i = 0; i < comentario.replies.length; i++) {
				if (comentario.replies[i].user == reply.user && comentario.replies[i].text == reply.text && comentario.replies[i].createdAt == reply.createdAt) {
					comentario.replies[i].text = newtext;
					break;
				}
			}
			ComentarioHotel.update({id: id}, comentario).then(function (com) {
				console.log('Editando respuesta...');
				return res.json(com[0]);
			}).catch(console.log);
		}).catch(console.log);
	},

	getUser: function (req, res) {
		if (req.user) {
			return res.json(req.user);
		} else {
			return res.json({error: true, message: 'Usuario no logeado'});
		}
	},

	deleteComment: function (req, res) {
		var id = req.param('id');
		ComentarioHotel.destroy({id: id}).then(function (com) {
			return res.json(com);
		}).catch(console.log);
	},

	editComment: function (req, res) {
		var id = req.param('id');
		var newtext = req.param('newtext');
		ComentarioHotel.findOne({id: id}).then(function (comentario) {
			comentario.text = newtext;
			ComentarioHotel.update({id: id}, comentario).then(function (com) {
				return res.json(com[0]);
			}).catch(console.log);
		}).catch(console.log);;
	},

	getLastFive: function (req, res) {
		ComentarioHotel.find({}).limit(5).sort('createdAt DESC').populateAll().then(function(data) {
		  return res.json(data);
		}).catch(function(err) {
		  return res.json(500, {err: err});
		});
	},

	getRango: function (req, res) {
		var id = req.param('id');
		ComentarioHotel.find({user: id}).then(function(data) {
		  return res.json({rango: data.length});
		}).catch(function(err) {
		  return res.json(500, {err: err});
		});
	},

	getFeatured: function (req, res) {
		let id = req.param('id');
		console.log(id);
		ComentarioHotel.find({hotel: [id, id.toString()], featured: true}).populateAll().then(function(data) {
		  return res.json(data);
		}).catch(function(err) {
		  return res.json(500, {err: err});
		});
	}

};
