/**
 * RFPController
 *
 * @description :: Server-side logic for managing RFPS
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Q = require('q');
module.exports = {
	crear:function(req,res){
		var rfp = req.allParams();
		var recintos = rfp.recintos;
		var Qrecintos = [];
		Q.all(Qrecintos).then(function(recintos){
			console.log("RECINTOS >",recintos)
			delete rfp.recintos;
			rfp.recintos = [];
			for(var i in recintos){
				rfp.recintos.push(recintos[i].id);
			}
			console.info("CREATE_RFP",rfp)
			RFP.create(rfp).then(function(rfp){
				return res.json(rfp);
			}).catch(function(err){
				console.error(err);
				return res.json(500,err);
			})
		}).catch(function(err){
			console.error(err);
			return res.json(500,err);
		})
		
	}
};
