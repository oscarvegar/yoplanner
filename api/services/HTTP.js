
var unirest = require('unirest');
var Q = require('q');
module.exports = {
	post:function(obj){
		var deferred = Q.defer();
		
		unirest.post(obj.url)
		.headers(obj.headers)
		.send()
		.end(function(response){
			deferred.resolve(response.body);
		})

		return deferred.promise;
	},

	get:function(obj){
		var deferred = Q.defer();
		try{
			unirest.get(obj.url)
			.headers(obj.headers)
			.send()
			.end(function(response){
				console.log("response",response.body)
				if(response.status == 200)
					deferred.resolve(response.body);
				else{
					console.log("error yengo a HTTP");
					deferred.reject(new Error("error en despegar api"));
				}
			}).catch(function(err){
				console.log("error yengo a HTTP");
				deferred.reject("ex");
			})
		}catch(ex){
			deferred.reject(new Error("No se pudo alcanzar el host"));
		}
		

		return deferred.promise;
	}
}