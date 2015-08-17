/**
 * SalonHotelController
 *
 * @description :: Server-side logic for managing Salonhotels
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findByRecintoId:function(req,res){
		var params = req.allParams();
		console.log("SALON RECINTO ID >>>>> ",params.id)
		SalonRecinto.find({recinto:""+params.id}).exec(function(err,data){
			console.log("SALON RECINTO ID >>>>> ",data)
			if(err){return res.send(500,err)};
			return res.json(data);
		});
	}
};

