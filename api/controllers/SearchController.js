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
        var id = req.allParams().id;
        var options = {
            hostname : "api.despegar.com",
            path : "/autocomplete/cities/"+id,
            //options.method = "GET";
            headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
        };
        HttpClientService.httpsGET(options,function(response){
            res.send(response);
        });
        
       
        
    }
};

