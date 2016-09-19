'use strict';
/**
 * RFPController
 *
 * @description :: Server-side logic for managing RFPS
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Q = require('q');
var moment = require('moment');
var fs = require('fs');

module.exports = {

	upload: function (req, res) {
		try {
			console.log('Uploading image...');
			var imagen = req.file('image').upload({ maxBytes: 10000000 }, function (err, uploadedFiles) {
			console.log(" uploadedFiles[0].fd", uploadedFiles[0].fd)
			var file = uploadedFiles[0].fd.substr(uploadedFiles[0].fd.lastIndexOf("/")+1);
			if (err) {
				console.log('Error: ', err);
				return res.json(500, { error: err });
			} else {
				console.log(file);
				return res.json({
					message: 'File uploaded successfully.',
          //url: "http://localhost:3000/rfp/serve/"+uploadedFiles[0].fd.substr(uploadedFiles[0].fd.lastIndexOf("\\")+1),
				  url: "http://rfp.yoplanner.com/rfp/serve/"+uploadedFiles[0].fd.substr(uploadedFiles[0].fd.lastIndexOf("/")+1),
					file: uploadedFiles
				});
			}
			});
		} catch (err) {
			return res.json(500, { error: err });
		}
	},

	serve: function (req, res) {
    //var file = __dirname.replace('api\\controllers', '.tmp\\uploads\\' + req.param('id'));
	  var file = __dirname.replace('api/controllers', '.tmp/uploads/' + req.param('id'));
		if(fs.existsSync(file)){
			var filestream = fs.createReadStream(file);
			filestream.pipe(res);
		}else{
			res.json(500,"bad file")
		}
	},

	crear:function(req,res){
		var rfp = req.allParams();
		var recintos = rfp.recintos;
		var Qrecintos = [];

		delete rfp.recintos;
		rfp.recintos = [];
		for(var i in recintos){
			rfp.recintos.push(recintos[i].id);
		}
		rfp.createdBy = req.user.id;
		rfp.account = req.user.account;
		RFP.create(rfp).then(function(rfp){
			return res.json(rfp);
		}).catch(function(err){
			console.error(err);
			return res.json(500,err);
		})

	},
	findById:function(req,res){
		var id = req.param('id');
		RFP.findOne(id).populate("recintos").then(function(rfp){
			res.json(rfp)
		}).catch(function(err){
			console.error(err);
			res.json(500,err)
		})
	},
	print:function(req,res){
		var id = req.param('id');
		RFP.findOne(id).populate("recintos").populate("salones").populate("configuracionHabitaciones").then(function(rfp){
			var qsalones = []
			rfp.salones.forEach(function(salon){
				qsalones.push(Salon.findOne(salon.id).populate("tipoSalon").populate("tipoEvento"));
			})

			Q.all(qsalones).then(function(salones){
				rfp.salones = salones;
				if(!rfp)return res.send(404)
				console.log("rfp",rfp)

				res.view('rfp/print',
					{
						layout:'',
						rfp:rfp,
						moment:moment
					}
				)
			}).catch(function(err){
				console.log(err)
				res.error();
			})

		}).catch(function(err){
			console.error(err);
			res.json(500,err)
		})
	},
	test:function(req,res){
		var from = req.param('from');
		var to = req.param('to');
		console.log("from to",from,to);
		EmailService.sendTest({from:from,to:to});
		res.json("ok");
	},

  //Enviar mail de customer
  sendCustomerMail: function (req, res) {
		var rfp = req.param('rfp');
		if (!rfp.salones) {
			rfp.salones = [];
		}
    EmailService.sendCustomer(req.param('options'), rfp, req.user);
    console.log('Enviando correo a customer...');
  },

	sendHotelMail: function (req, res) {
		var userPlanner = req.user;
		var rfp = req.param('rfp');
		User.findOne({account: userPlanner.account, roles: ['ROLE_ADMIN_PLANNERS']}).then(function(data) {
			//Cargar logo de agencia
			if (!data.logoagencia) {
				data.logoagencia = 'http://rfp.yoplanner.com/img/icons/apple-touch-icon-114x114.png';
			}/* else {
				data.logoagencia = 'http://admin.yoplanner.com' + data.logoagencia;
			}*/
			//Si el evento no trae salones, poner un array en blanco para que no truene
			if (!rfp.salones) {
				rfp.salones = [];
			}
			//Sacar agencia del admin agencia para el planner
			if (!userPlanner.empresa || userPlanner.empresa == null) {
				userPlanner.empresa = data.empresa;
			}
			console.log('USER SEND EMAIL HOTEL', userPlanner);
			EmailService.sendHotel(req.param('options'), rfp, userPlanner, data.logoagencia);
			console.log('Enviando correo a hotel...');
		});
  },

	sendPlannerMail: function (req, res) {
		var user = req.user;
		var rfp = req.param('rfp');
		User.findOne({account: user.account, roles: ['ROLE_ADMIN_PLANNERS']}).then(function(data) {
			//Cargar logo de agencia
			if (!data.logoagencia) {
				data.logoagencia = 'http://rfp.yoplanner.com/img/icons/apple-touch-icon-114x114.png';
			}/* else {
				data.logoagencia = 'http://admin.yoplanner.com' + data.logoagencia;
			}*/
			//Si el evento no trae salones, poner un array en blanco para que no truene
			if (!rfp.salones) {
				rfp.salones = [];
			}
			//Sacar agencia del admin agencia para el planner
			if (!user.empresa || user.empresa == null) {
				user.empresa = data.empresa;
			}
			EmailService.sendPlanner(req.param('options'), rfp, req.user, data.logoagencia);
			console.log('Enviando correo a planner...');
		});
  },

	testMail: function (req, res) {
		RFP.find({}).limit(1).then(function(data) {
		  return res.view('emailTemplates/plannernew.ejs', {rfp: data[0], moment: moment, user: req.user});
		}).catch(console.log);
	},

	findAgenciaLogo: function (req, res) {
		var user = req.user;
		User.findOne({account: user.account, roles: ['ROLE_ADMIN_PLANNERS']}).then(function(data) {
			console.log('LOGO DE AGENCIA', data);
		  return res.json(data);
		});
	}
};
