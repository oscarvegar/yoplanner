'use strict';
var Q = require("q");
var AGRUPADORES_CIUDAD = [
    ["SD6", "SJD", "CL1"]
];
module.exports = {
    findByCiudadId: function(idciudad, page) {
        var deferred = Q.defer();

        var pagesize = 12;
        if (!page) page = 1;
        else page++;

        console.log("id ciudad", idciudad)
        console.log("page", page)
        console.log("pagesize", pagesize)
        var condition = idciudad;
        for (var i in AGRUPADORES_CIUDAD) {
            if (AGRUPADORES_CIUDAD[i].indexOf(idciudad) >= 0) {
                condition = AGRUPADORES_CIUDAD[i];
                break;
            }
        }
        Recinto.findOne().where({
            cityId: condition
        }).then(function(data) {
            if (!data) {
                CityService.importCity(idciudad).then(function(data) {
                    return deferred.resolve(data);
                }).catch(function(err) {
                    console.log(err);
                    deferred.reject(err);
                })
            } else {
                Recinto.find().where({
                        cityId: condition
                    })
                    .paginate({
                        page: page,
                        limit: pagesize
                    }).sort("place DESC").sort("starRating DESC").then(function(data) {
                        return deferred.resolve(data);
                    })
            }
        });
        return deferred.promise;
    },

    findByUrlSlug: function(url) {
        var deferred = Q.defer();
        Recinto.findOne({
            urlslug: url
        }).populate("amenities").then(function(recinto) {
            if (!recinto) return deferred.resolve(null)
            SalonRecinto.find({
                recinto: recinto.id,
                active: true
            }).then(function(salonesRecinto) {
                recinto.salones = salonesRecinto;
                return deferred.resolve(recinto)
            })
        })
        return deferred.promise;
    },

    findById: function(id) {
        var deferred = Q.defer();
        Recinto.findOne(id).populate("amenities").then(function(recinto) {
            SalonRecinto.find({
                recinto: recinto.id,
                active: true
            }).then(function(salonesRecinto) {
                recinto.salones = salonesRecinto;
                return deferred.resolve(recinto)
            })
        })
        return deferred.promise;
    }
}