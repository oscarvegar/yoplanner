/**
 * RecintoController
 *
 * @description :: Server-side logic for managing Recintoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//https://api.despegar.com/v3/hotels/availabilities?site=MX&checkin_date=2014-10-25&checkout_date=2014-10-30&destination=982&distribution=1&language=es&sorting=stars_descending&stars=3%2C4%2C5&pagesize=8
///availability/cities/{id}/hotels
module.exports = {
	findByCiudadId: function(req,res){
        var hotelesVendidos = {PCM:[353356,352782]};
        var resSize = 11;
        var id = req.allParams().id;
        var options = {
            hostname : "api.despegar.com",
            path : "/availability/cities/"+id+"/hotels?sort=stars&order=desc&includehotel=true&stars=3-4-5&type=RSR-HOT",
            headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
        };
        // Start the request
        HttpClientService.httpsGET(options,function(response){
            try{ 
               
                var data = JSON.parse(response);
                var ids = "";
                var p = 0;
                if(req.param('p')){
                    p = req.param('p');
                    resSize = 12;
                }else{
                    if(hotelesVendidos[id].length>0){
                        for(var i in hotelesVendidos[id]){
                            ids += hotelesVendidos[id][i]+",";
                        }
                    }
                }
                for(var d in data.availability){
                    if(d>=(resSize+(p*resSize)))
                        break;
                    else if(d<(resSize*p)){
                        continue;
                    }
                    ids += data.availability[d].hotel.id+",";
                    
                }
                console.log(ids)
                options = {
                    hostname : "api.despegar.com",
                    path : "/hotels/"+ids+"?includeamenities=true&includesummary=true",
                    headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
                };
                 HttpClientService.httpsGET(options,function(resp){
                     var hoteles = JSON.parse(resp);
                     var arrResHot = [];
                     console.log(hotelesVendidos[id]);
                     for(var i=0;i<hotelesVendidos[id].length;i++){
                         
                         for(var j in hoteles.hotels){
                             console.log(hoteles.hotels[j].id)
                             console.log(hotelesVendidos[id][i])
                             console.log("----------------------")
                             if(hoteles.hotels[j].id==hotelesVendidos[id][i]){
                                 var hot = hoteles.hotels[j];
                                 hoteles.hotels.splice(j,1);
                                 arrResHot.push(hot);
                                 break;
                             }
                         }
                     }
                     hoteles.hotels = arrResHot.concat(hoteles.hotels);
                     res.json(hoteles);
                 });
            }catch(ex){
                res.json(500,{})   
            }
           
        });
    }
};

