/**
 * RecintoController
 *
 * @description :: Server-side logic for managing Recintoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	findByCiudadId: function(req,res){
        var id = req.allParams().id;
        var options = {
            hostname : "api.despegar.com",
            path : "/cities/"+id+"/pointsofinterest?pointtypes=H",
            headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
        };
        // Start the request
        HttpClientService.httpsGET(options,function(response){
            var ids = "";
            var data = JSON.parse(response).data;
            for(var d in data){
                   ids += data[d].internalId+",";
            }
           
            options = {
                hostname : "api.despegar.com",
                path : "/hotels/"+ids+"?includeamenities=true&includesummary=true",
                headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
            };
             HttpClientService.httpsGET(options,function(resp){
                  res.send(resp);
             });
           
        });
    }
};

