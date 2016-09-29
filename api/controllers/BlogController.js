var unirest = require('unirest');
module.exports = {
	'getPost':function(req,res){
		var id = req.allParams().id;
		var year = req.allParams().year;
		var month = req.allParams().month;
		req.session.postId = id;
		console.info("URL SOLICITADA API BLOG ::: ","https://www.googleapis.com/blogger/v3/blogs/6838970422906123086/posts/bypath?path=/"+year+"/"+month+"/"+id+"&key=AIzaSyBAg_S0Hde7VaxSVp_mmEB0gOdzCCO756Y")
		unirest.get("https://www.googleapis.com/blogger/v3/blogs/6838970422906123086/posts/bypath?path=/"+year+"/"+month+"/"+id+"&key=AIzaSyBAg_S0Hde7VaxSVp_mmEB0gOdzCCO756Y")
		.end(function(response){
			//console.log(response.body)
			var content = response.body.content;
			var idxImgIni = content.search("<a href=");
			var idxImgExt = content.search(".jpg");
			if(idxImgExt<0)idxImgExt = content.search(".JPG");
			if(idxImgExt<0)idxImgExt = content.search(".png");
			if(idxImgExt<0)idxImgExt = content.search(".PNG");
			if(idxImgExt<0)idxImgExt = content.search(".gif");
			if(idxImgExt<0)idxImgExt = content.search(".GIF");
			var imagen = content.substr(idxImgIni+9,idxImgExt-idxImgIni-5);
			console.log("IMAGEN >>>>>",imagen)

			var description = response.body.labels?response.body.labels[0]:"";
			for(var i in response.body.labels){
				if(i==0)continue;
				description=description+","+response.body.labels[i];
			}
			metas={
	            title : response.body.title,
	            image : imagen,
	            description : description,
	            postId : year+"/"+month+"/"+id
	        }
	        req.session.metas = metas;
	        res.locals.response = res;
	        res.view("empty",{layout:"shareLayout"})
		})
		
	}
};