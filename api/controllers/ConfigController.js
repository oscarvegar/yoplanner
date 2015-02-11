/**
 * ConfigController
 *
 * @description :: Server-side logic for managing configs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'param':function(req,res){
		console.log(req.allParams().id)
		var id = req.allParams().id;
		Config.findOne({key:id}).exec(function(err,data){
			//console.log(data)
			return res.json(data);
		});

	}
};

