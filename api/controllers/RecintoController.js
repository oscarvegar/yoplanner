/**
 * RecintoController
 *
 * @description :: Server-side logic for managing Recintoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//https://api.despegar.com/v3/hotels/availabilities?site=MX&checkin_date=2014-10-25&checkout_date=2014-10-30&destination=982&distribution=1&language=es&sorting=stars_descending&stars=3%2C4%2C5&pagesize=8
module.exports = {
	findByCiudadId: function(req,res){
        var resSize = 8;
        var id = req.allParams().id;
        var options = {
            hostname : "api.despegar.com",
            path : "/cities/"+id+"/pointsofinterest?pointtypes=H",
            headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
        };
        // Start the request
        HttpClientService.httpsGET(options,function(response){
            try{ 
                var ids = "";
                var data = JSON.parse(response).data;
                
                var p = 0;
                if(req.param('p')){
                    p = req.param('p');
                    resSize = 9;
                }
                for(var d in data){
                    if(d>=(resSize+(p*resSize)))
                        break;
                    else if(d<(resSize*p)){
                        continue;
                    }
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
            }catch(ex){
                res.json(500,{})   
            }
           
        });
    }
};

