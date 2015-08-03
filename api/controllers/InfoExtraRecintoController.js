/**
 * InfoExtraRecintoController
 *
 * @description :: Server-side logic for managing Infoextrarecintoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findByRecintoId:function(req,res){
		var id = req.allParams().id;
		InfoExtraRecinto.find({recinto:id}).exec(function(err,data){
			console.log("INFO EXTRA RECINTO >>>>> ",data)
			res.json(data);
		});
	}
};

