/**
 * SearchController
 *
 * @description :: Server-side logic for managing Searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var https = require("https");
var gunzip = require("zlib").createGunzip();

module.exports = {
    cities: function(req,res){
        try{
            var id = req.allParams().id;
            //if(id.length > 10)
                //return res.json(500)
            var tmpId = encodeURIComponent(id);
            console.log("PATH >>>>>/autocomplete/cities/"+tmpId);
            var options = {
                hostname : "api.despegar.com",
                path : "/autocomplete/cities/"+tmpId,
                //options.method = "GET";
                headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
            };
            HttpClientService.httpsGET(options,function(response){
                var ciudades = JSON.parse(response).autocomplete;
                for(var i in ciudades){
                    var ciudad = ciudades[i];
                    ciudad.slug = ciudad.name.toLowerCase().replace(/,/g,"-").replace(/ /g,"");
                    console.log("ciudad",ciudad)
                    Ciudad.findOrCreate({id:ciudad.id},ciudad).then(function(ciudad){
                        console.log("Ciudad Nueva >>>>>",ciudad.id)
                    })

                }
                if(response==null)res.json(500);
                res.send(response);

            });
        } catch(e){
            console.log(e);
            res.json(500)
        }


    },

    findByCityCode : function(req,res){
        var id = req.param('id');
        console.log("id",id)
        Ciudad.findOne(id).then(function(ciudad){
            if(!ciudad)return res.notFound();
            return res.redirect(ciudad.slug)
        })
    }
};

