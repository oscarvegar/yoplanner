'use strict';
/**
 * RFPController
 *
 * @description :: Server-side logic for managing RFPS
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Q = require('q');
var moment = require('moment');


module.exports = {
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
		console.log("user",req.user)
		res.json("ok")
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
		var rfp = req.param('rfp');
		if (!rfp.salones) {
			rfp.salones = [];
		}
    EmailService.sendHotel(req.param('options'), rfp, req.user);
    console.log('Enviando correo a hotel...');
  },

	sendPlannerMail: function (req, res) {
		var rfp = req.param('rfp');
		if (!rfp.salones) {
			rfp.salones = [];
		}
    EmailService.sendPlanner(req.param('options'), rfp, req.user);
    console.log('Enviando correo a planner...');
  },

	testMail: function (req, res) {
		RFP.find({}).limit(1).then(function(data) {
		  return res.view('emailTemplates/plannernew.ejs', {rfp: data[0], moment: moment, user: req.user});
		}).catch(console.log);
	}
};
