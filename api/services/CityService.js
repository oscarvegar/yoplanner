
var Q = require('q');

var _this = module.exports = {

	importCity : function(city){
		var deferred = Q.defer();
		_this.importCities([city]).then(function(data){
			return deferred.resolve(data)
		}).catch(function(err){
			return deferred.reject(err);
		});
		return deferred.promise;
	},

	importCities : function(cities){
		var deferred = Q.defer();

		console.log("Eliminando repetidos",cities.length)

		cities = cities.filter(function(item, pos) {
			return cities.indexOf(item) == pos;
		})


		console.log("Repetidos eliminados",cities.length)

		var qcities = [];
		for(var k in cities){
			qcities.push(Recinto.findOne({"cityId":cities[k]}));
		}


		Q.all(qcities).then(function(hotelincity){
			for(var i=0;i<hotelincity.length;i++){
				if(hotelincity[i]){
					console.log("city found, returning",hotelincity[i].cityId)
					cities.splice(i,1);
					hotelincity.splice(i,1);
					console.log("cities",cities.length);
					i--;
				}
			}
			

			console.log("cities",cities);
			console.log("cities.length ",cities.length );
			console.log("cities.length === 0 ",cities.length === 0 );

			if(cities.length === 0)return deferred.resolve([]);
			for(var k in cities){
				console.log("for de cities",cities[k])
				var options = {
					url: "http://api.despegar.com/availability/cities/"+cities[k]+"/hotels?sort=stars&order=desc&includehotel=true&stars=3-4-5&type=RSR-HOT&pagesize=500",
					headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
				};
				console.log("antes de ir al httpget",options.url);
				HTTP.get(options).then(function(response){
					if(!response.availability || response.availability.length==0)
						return deferred.resolve("ok");
					var ids = "";
					for(var i in response.availability){
						ids = ids+response.availability[i].hotel.id+",";
					}
					options = {
						url: "http://api.despegar.com/hotels/"+ids+"?includeamenities=true&includesummary=true",
						headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
					};
					console.log("ids",response.availability.length)
					HTTP.get(options).then(function(response){
						var amens = [];
						var amensids = [];
						for(var i in response.hotels){

							response.hotels[i].urlslug = response.hotels[i].name.toLowerCase()
			                    .replace(/,/g, "-")
			                    .replace(/ /g, "-")
			                    .replaceAll("á","a")
			                    .replaceAll("Á","A")
			                    .replaceAll("é","e")
			                    .replaceAll("É","E")
			                    .replaceAll("í","i")
			                    .replaceAll("Í","I")
			                    .replaceAll("ó","o")
			                    .replaceAll("Ó","O")
			                    .replaceAll("ú","u")
			                    .replaceAll("Ú","U")
			                    .replaceAll("ñ","n")
			                    .replaceAll("Ñ","N");
		                    console.log("urlslug",response.hotels[i].urlslug);
							for(var j in response.hotels[i].pictures){
								response.hotels[i].pictures[j] = sails.config.constants.URL_PICTURES+response.hotels[i].pictures[j];
							}
							response.hotels[i].fotoPrincipal = response.hotels[i].pictures[0];

							for(var j in response.hotels[i].amenities){
								if(amensids.indexOf(response.hotels[i].amenities[j].id)<0){
									amens.push(Amenity.findOrCreate({id:response.hotels[i].amenities[j].id},response.hotels[i].amenities[j]));
									amensids.push(response.hotels[i].amenities[j].id);
								}
								response.hotels[i].amenities[j] = response.hotels[i].amenities[j].id;
							}
						}

						Q.all(amens).then(function(amen){
							var htoinsert = [];
							var rapidinsert =[];
							for(var z=0 ; z<12 ; z++){
								rapidinsert.push(Recinto.create(response.hotels[z]));
							}
							Q.all(rapidinsert).then(function(nhoteles){
								sails.log.debug("hoteles nuevos",nhoteles)
								return deferred.resolve(nhoteles);
							}).catch(function(err){
								sails.log.error("valió pastor",err)
								return deferred.reject(err)
							})
							z = 0;
							for(var p in response.hotels){
								if(z<12){
									z++;
									continue;
								}
								htoinsert.push(Recinto.create(response.hotels[p]));
							}

							Q.all(htoinsert).then(function(hoteles){
								sails.log.debug("HOTELES CREADOS")
							}).catch(function(err){
								console.error(err)
								return deferred.reject(err);
							})
							
						})
					}).catch(function(err){
						console.log("Error al consultar API de despegar",err);
						return deferred.reject(err);
					});
				}).catch(function(err){
					//console.debug("error al ir al http://api.despegar.com/availability/cities/"+cities[k])
					
					console.log("error al ir al http://api.despegar.com/availability/cities/")
					deferred.reject(err)
				})
			}
		})
		return deferred.promise;
	}
}