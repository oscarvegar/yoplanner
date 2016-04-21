/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	root:function(req,res){
		var url = req.param('id');
		console.log("MainController","url",url)
		if(!url || url.search(/favicon/)>=0)return res.view('homepage');

		Ciudad.findOne({slug:url}).then(function(ciudad){
			if(!ciudad){
				RecintoService.findByUrlSlug(url)
				.then(function(hotel){
					if(!hotel){
						RecintoService.findById(url)
						.then(function(hotel){
							var amens = "";
							hotel.amenities.forEach(function(amen){
								amens+="Hotel con "+amen.description+",";
							})
							res.view("hoteles/hotel-detail",
							{
								hotel:hotel,
								metas:{
									title:hotel.name,
									description:hotel.description,
									keywords:hotel.name+","+amens,
									image:hotel.pictures[0]
								}
							});
						})
					}else{
						console.log("hotel",hotel.name)
						var amens = "";
						hotel.amenities.forEach(function(amen){
							amens+="Hotel con "+amen.description+",";
						})
						res.view("hoteles/hotel-detail",
						{
							hotel:hotel,
							metas:{
								title:hotel.name,
								description:hotel.description,
								keywords:hotel.name+","+amens,
								image:hotel.pictures[0]
							}
						});
					}
				}).catch(function(err){
					console.log(__filename,err)
					
				})
			}
			else{
				RecintoService.findByCiudadId(ciudad.id).then(function(hoteles){
					res.view('hoteles/hoteles-list',
					{
						hoteles:hoteles,
						ciudad:ciudad,
						metas:{
							title:'Hoteles en '+ciudad.name,
							description:'Organiza eventos en '+ciudad.name,
							keywords:'Hoteles en '+ciudad.name+',Eventos en '+ciudad.name+',Convenciones en '+ciudad.name,
							image:ciudad.image
						}
					})
				})
			}
		})

		



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
	}
	
	
};

