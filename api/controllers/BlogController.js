module.exports = {
	'getPost':function(req,res){
		var id = req.allParams().id;
		req.session.postId = id;
		res.redirect('/#/blog/'+id);
	}
};