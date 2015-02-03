/**
 * DeployController
 *
 * @description :: Server-side logic for managing deploys
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	webhook:function(req,res){
		console.log(">>>>> PUSH DETECTADO <<<<<");
		res.send(200);
	}
};

