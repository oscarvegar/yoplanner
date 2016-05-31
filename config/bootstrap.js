/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
	TipoEvento.find({_id:"1"}).exec(function(err,data){
		if(data.length == 0)
			TipoEvento.create({id:1,description:"Desayuno"}).exec(console.log);
	});
	TipoEvento.find({_id:"2"}).exec(function(err,data){
		if(data.length == 0)
			TipoEvento.create({id:2,description:"Comida"}).exec(console.log);
	});
	TipoEvento.find({_id:"3"}).exec(function(err,data){
		if(data.length == 0)
			TipoEvento.create({id:3,description:"Cena"}).exec(console.log);
	});
	TipoEvento.find({_id:"4"}).exec(function(err,data){
		if(data.length == 0)
			TipoEvento.create({id:4,description:"Cocktail"}).exec(console.log);
	});
	TipoEvento.find({_id:"5"}).exec(function(err,data){
		if(data.length == 0)
			TipoEvento.create({id:5,description:"Sesión"}).exec(console.log);
	});
	TipoEvento.find({_id:"6"}).exec(function(err,data){
		if(data.length == 0)
			TipoEvento.create({id:6,description:"Breakout"}).exec(console.log);
	});
	TipoEvento.find({_id:"7"}).exec(function(err,data){
		if(data.length == 0)
			TipoEvento.create({id:7,description:"Oficina"}).exec(console.log);
	});
	TipoEvento.find({_id:"8"}).exec(function(err,data){
		if(data.length == 0)
			TipoEvento.create({id:8,description:"Bodega"}).exec(console.log);
	});
	TipoEvento.find({_id:"9"}).exec(function(err,data){
		if(data.length == 0)
			TipoEvento.create({id:9,description:"Otro"}).exec(console.log);
	});



	Montaje.find({_id:"1"}).exec(function(err,data){
		if(data.length == 0)
			Montaje.create({id:1,description:"Auditorio"}).exec(console.log);
	});
	Montaje.find({_id:"2"}).exec(function(err,data){
		if(data.length == 0)
			Montaje.create({id:2,description:"Banquete"}).exec(console.log);
	});
	Montaje.find({_id:"3"}).exec(function(err,data){
		if(data.length == 0)
			Montaje.create({id:3,description:"Coctel"}).exec(console.log);
	});
	Montaje.find({_id:"4"}).exec(function(err,data){
		if(data.length == 0)
			Montaje.create({id:4,description:"Escuela"}).exec(console.log);
	});

	Montaje.find({_id:"5"}).exec(function(err,data){
		if(data.length == 0)
			Montaje.create({id:5,description:"Herradura"}).exec(console.log);
	});

	Montaje.find({_id:"6"}).exec(function(err,data){
		if(data.length == 0)
			Montaje.create({id:6,description:"Imperial"}).exec(console.log);
	});

	Montaje.find({_id:"7"}).exec(function(err,data){
		if(data.length == 0)
			Montaje.create({id:7,description:"Mesas"}).exec(console.log);
	});

	Montaje.find({_id:"8"}).exec(function(err,data){
		if(data.length == 0)
			Montaje.create({id:8,description:"Medias Lunas"}).exec(console.log);
	});

	Montaje.find({_id:"9"}).exec(function(err,data){
		if(data.length == 0)
			Montaje.create({id:9,description:"Otro"}).exec(console.log);
	});
	
	Config.find({key:"defaultGPost"}).exec(function(err,data){
		if(data.length == 0)
			Config.create({key:"defaultGPost",value:"https://plus.google.com/113624413123385492768/posts/gXtfiJkXv1a"}).exec(console.log);
	});

	Recinto.update({id:290585},{$set:{place:3}}).then(console.log);
	Recinto.update({id:290585},{$set:{place:2}}).then(console.log);

	Recinto.create({id:290286,place:1}).then(console.log)
	Recinto.update({id:290286},{place:1,starRating:4,name:"Sheraton Santa Fe",cityId:"MEX",pictures:[],address:{fullAddress:"Guillermo González Camarena 200,Álvaro Obregón,Sta Fé,01210 Ciudad de México, D.F."},geoLocation:{ "latitude" : 19.3683322, "longitude" : -99.261204 }}).then(console.log);

	Recinto.update({id:290286},{starRating:4}).then(console.log)
	/*SalonRecinto.find().exec(function(err,data){
		for(var i in data){
			var registro = data[i];
			registro.recinto = ""+registro.recinto;
			registro.save(console.log);
		}
	})

	InfoExtraRecinto.find().exec(function(err,data){
		for(var i in data){
			var registro = data[i];
			registro.recinto = ""+registro.recinto;
			registro.save(console.log);
		}
	})*/

	

 

  cb();
};