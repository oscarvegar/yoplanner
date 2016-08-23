/**
 * NotificacionController
 *
 * @description :: Server-side logic for managing Notificacions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	subscribe: function (req, res) {
		var user = req.param('user');
		if (req.isSocket) {
			sails.sockets.join(req, 'notificaciones-room', function (err) {
				if (err) {
					console.log('Error al conrectar al sockets de notis');
				}
			});

			return res.json({message: 'Conectado al socket de notis'});
		} else {
			return res.json({error: true, message: 'No es socket.'});
		}
	},

	testSocket: function (req, res) {
		var roomName = req.param('room');
		var message = req.param('msg');
		sails.sockets.broadcast(roomName, 'notificacionsocket', {message: message});
		console.log('Mensaje: '+message+' enviado al room:', roomName);
	},

	publicar: function (req, res) {
		parametros = req.allParams();
		var tempnotiparams = {
			title: parametros.title,
			text: parametros.text,
			thumbnail: parametros.thumbnail,
			user: parametros.user,
			image: parametros.image,
			destino: parametros.destino
		};
		Notificacion.create(tempnotiparams).then(function(data) {
			console.log('DESTINO NOTI ENTRANTE', data.destino);

			//Todos los usuarios
			if (data.destino.allusers) {
				sails.sockets.broadcast('notificaciones-room', 'notificacionsocket', {notificacion: data, room: 'all-users-notis'});
			}
			//planeners de una agencia
			if (data.destino.ownplanners) {
				User.find({account: parametros.account}).then(function(planners) {
				  var tempIds = [];
					planners.forEach(function (user) {
						if (user.roles.indexOf('ROLE_PLANNER') >= 0) {
							tempIds.push(user.id);
						}
					});
					data.planners = tempIds;
					console.log('PLannerrs de noti', data.planners);
					sails.sockets.broadcast('notificaciones-room', 'notificacionsocket', {notificacion: data, room: 'my-planners-notis'});
				}).catch(console.log);
			}
			//Todos los planners del sistema
			if (data.destino.allplanners) {
				sails.sockets.broadcast('notificaciones-room', 'notificacionsocket', {notificacion: data, room: 'all-planners-notis'});
			}

			//Mis super planners1
			if (data.destino.ownsuperplanners) {
				User.find({account: parametros.account, roles: ['ROLE_SUPER_PLANNERS']}).then(function(superplanners) {
				  var tempSuperIds = [];
					superplanners.forEach(function (superplanner) {
						tempSuperIds.push(superplanner.id);
					});
					data.superplanners = tempSuperIds;
					sails.sockets.broadcast('notificaciones-room', 'notificacionsocket', {notificacion: data, room: 'my-superplanners-notis'});
				}).catch(console.log);
			}

			//TODOS los supers planners
			if (data.destino.allsuperplanners) {
				sails.sockets.broadcast('notificaciones-room', 'notificacionsocket', {notificacion: data, room: 'all-superplanners-notis'});
			}

			//TODOS los administradores del sistema
			if (data.destino.alladmins) {
				sails.sockets.broadcast('notificaciones-room', 'notificacionsocket', {notificacion: data, room: 'all-admins-notis'});
			}

			return res.json(data);
		}).catch(function (err) {
			console.log(err);
			return res.json({error: true, message: 'Error publicando notificacion'});
		});
	},

	delete: function (req, res) {
		var id = req.param('id');
		Notificacion.destroy({id: id}).then(function(data) {
		  return res.json(data[0]);
		}).catch(console.log);
	},

	getByUser: function (req, res) {
		//Regresa las notificaciones enviadas
		var id = req.param('id');
		Notificacion.find({user: id}).then(function(data) {
		  return res.json(data);
		}).catch(console.log);
	},

	save: function (req, res) {
		var notiparam = req.param('notificacion');
		var user = req.param('user');
		User.findOne({id: user.id}).then(function(data) {
		  if (!data.notificacionesRecibidas) {
		  	data.notificacionesRecibidas = [notiparam];
		  }
			User.update({id: data.id}, {notificacionesRecibidas: data.notificacionesRecibidas}).then(function(userupdate) {
			  return res.json(userupdate[0]);
			}).catch(console.log);
		}).catch(console.log);
	},

	sendNotificationHotelComment: function (req, rs) {
		var comentario = req.param('comentario');
		//Encontrar usuario de hotel
		User.findOne({hotels: [comentario.hotel.id]}).then(function(userhotel) {
		  if (!userhotel.notificacionesRecibidas) {
				userhotel.notificacionesRecibidas = [];
		  }
			var tempNoti = {
				title: 'Nuevo comentario recibido en ' + comentario.hotel.name,
				text: 'El usuario: ' + (userhotel.name ? userhotel.name : userhotel.username) + ' ha comentado en el hotel: ' + comentario.hotel.name,
				thumbnail: 'http://rfp.yoplanner.com/img/icons/apple-touch-icon-114x114.png',
				destino: {
					hotel: true
				}
			};
			userhotel.notificacionesRecibidas.push(tempNoti);
			User.update({id: userhotel.id}, {notificacionesRecibidas: userhotel.notificacionesRecibidas}).then(function(userupdated) {
			  sails.sockets.broadcast('notificaciones-room', 'notificacionsocket', {notificacion: tempNoti, room: 'hotel-comment'});
				console.log('Notificacion enviada a hotel por comentario');
				return res.json(tempNoti);
			});
		})
	},

	getNotifications: function (req, res) {
		var id = req.user.id;
		User.findOne({id: id}).then(function(data) {
		  return res.json({notis: (data.notificacionesRecibidas ? data.notificacionesRecibidas : [])});
		}).catch(function(err) {
			console.log(err);
		  return res.json(500, {err: err});
		});
	}
};
