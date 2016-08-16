'use strict';
/**
 * SearchController
 *
 * @description :: Server-side logic for managing Searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    cities: function(req, res) {

        var id = req.allParams().id;
        //if(id.length > 10)
        //return res.json(500)
        var tmpId = encodeURIComponent(id);
        console.log( "/v3/autocomplete?query="+tmpId+"&product=HOTELS&locale=es-MX&city_result=5");
        var options = {
            hostname: "api.despegar.com",
            path: "/v3/autocomplete?query="+tmpId+"&product=HOTELS&locale=es-MX&city_result=5",
            //options.method = "GET";
            headers: {
                "X-ApiKey": "a3172e4050774a9a9bdca7f6ebe50a2f"
            },
        };
        HttpClientService.httpsGET(options, function(response) {
            console.log("response AUTOCOMPLETE>>>",response);
            if (!response) res.json(500);
            var ciudades = JSON.parse(response);
            for (var i in ciudades) {
                var ciudad = ciudades[i];
                ciudad.idDes = ciudad.id;
                ciudad.name = ciudad.description;
                ciudad.id = ciudad.code;
                ciudad.slug = ciudad.description.toLowerCase()
                    .replace(/,/g, "-")
                    .replace(/ /g, "")
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
                console.log("ciudad", ciudad)
                Ciudad.findOrCreate({
                    id: ciudad.code
                }, ciudad).then(function(ciudad) {
                    console.log("Ciudad Nueva >>>>>", ciudad.id)
                })

            }
            res.json({autocomplete:ciudades});

        });


    },

    findByCityCode: function(req, res) {
        var id = req.param('id');
        console.log("id", id)
        Ciudad.findOne(id).then(function(ciudad) {
            if (!ciudad) return res.notFound();
            return res.redirect(ciudad.slug)
        })
    }
};