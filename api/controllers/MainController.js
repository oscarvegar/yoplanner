/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _SECCIONES = {
	"/quienes-somos":{ 
		title:"Quienes Somos",
		description:"",
		keywords:""
	},
	"/meetings":{ 
		title:"Meeting Planner",
		description:"",
		keywords:""
		

	},
	"/agencia-de-viajes":{ 
		title:"Agencia de Viajes",
		description:"",
		keywords:""
	}
}

module.exports = {

	root:function(req,res){
		res.view('homepage')
	},
	redirect:function(req,res){	
		
		var path=req.route.path;
		if(path==="/"){
			console.log("PATH")
			res.view('homepage')
		}else{
			res.locals.metas=_SECCIONES[path];
			res.locals.path=path;
			req.session.metas = _SECCIONES[path]; 
			res.view("empty",{layout:"infoLayout"})
		}
	},
	test:function(req,res){
		res.view("empty",{layout:"testLayout"})
	}
	
};

