/**
 * RecintoController
 *
 * @description :: Server-side logic for managing Recintoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//a3172e4050774a9a9bdca7f6ebe50a2f 
//https://api.despegar.com/v3/hotels/availabilities?site=MX&checkin_date=2014-10-25&checkout_date=2014-10-30&destination=982&distribution=1&language=es&sorting=stars_descending&stars=3%2C4%2C5&pagesize=8
///availability/cities/{id}/hotels
var URL_PICTURES = "http://media.staticontent.com/media/pictures/";
var URL_CUSTOM_PICTURES = "http://yoplanner.com/img/hoteles/";
module.exports = {
    findByRFP: function(req,res){
        params = req.allParams();
        RFP.findOne({id:params.rfp}).populate('recintos').exec(function(err,data){
            if(err)console.log(err);
            return res.json(data.recintos);
        });
    },
    findById: function(req,res){
        var params = req.allParams();
        var id = params.id;
        var options = {
            hostname : "api.despegar.com",
            path : "/hotels/"+id,
            headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
        };
        // Start the request
        HttpClientService.httpsGET(options,function(response){
            return res.json(JSON.parse(response));
        });

    },
    findByCiudadId: function(req,res){
        var hotelesVendidos = {CUN:[{hid:214570},{hid:563172},{hid:214692}],RM0:[{hid:214572}], SJD:[{hid:363032},{hid:276089},{hid:485792}],PCM:[{hid:352782 ,fotoPrincipal:URL_PICTURES+"10e328ef-a102-4387-aaaa-65cf86d20d10"},{hid:353356,fotoPrincipal:null}]};
        var hotelesProspecto = {MEX:[{hid:291554},{hid:642043},{hid:572877}],CUN:[{hid:681932,customPost:"https://plus.google.com/113624413123385492768/posts/bdoPUUzwCmw",fotoPrincipal:URL_CUSTOM_PICTURES+"681932/Four Points Cancun.jpg",customPictures:["681932/Four Points Cancun.jpg","681932/Four Points Cancun 2.jpg"]}]};
        var resSize = 11;
        var id = req.allParams().id;
        var options = {
            hostname : "api.despegar.com",
            path : "/availability/cities/"+id+"/hotels?sort=stars&order=desc&includehotel=true&stars=3-4-5&type=RSR-HOT&pagesize=100",
            headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
        };
        // Start the request
        HttpClientService.httpsGET(options,function(response){
            if(response==null)return res.json(500);
                var data = JSON.parse(response);
                var ids = "";
                var p = 0;
                if(req.param('p')){
                    p = req.param('p');
                    if(parseInt(p)==1){
                        for(var i in hotelesProspecto[id]){
                            ids += hotelesProspecto[id][i].hid+",";
                        }
                    }
                    resSize = 12;
                }else if(hotelesVendidos[id]){
                    if(hotelesVendidos[id].length>0){
                        for(var i in hotelesVendidos[id]){
                            ids += hotelesVendidos[id][i].hid+",";
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
                options = {
                    hostname : "api.despegar.com",
                    path : "/hotels/"+ids+"?includeamenities=true&includesummary=true",
                    headers : {"X-ApiKey":"53df4ffd-5adb-48ce-9738-72cea4a5da30MX"},
                };
                if(ids.length==0)return res.json({hotels:[]});
                HttpClientService.httpsGET(options,function(resp){
                    if(resp==null)return res.json(500);
                    var hoteles = JSON.parse(resp);
                    for(var i in hoteles.hotels){
                        for(var j in hoteles.hotels[i].pictures){
                            hoteles.hotels[i].pictures[j] = URL_PICTURES + hoteles.hotels[i].pictures[j];
                        }
                    }
                    var arrResHot = [];
                    //logica para hoteles vendidos
                    if(hotelesVendidos[id]){
                        for(var i=0;i<hotelesVendidos[id].length;i++){
                            
                            for(var j in hoteles.hotels){
                                if(hoteles.hotels[j].id==hotelesVendidos[id][i].hid){
                                    var hot = hoteles.hotels[j];
                                    if(hotelesVendidos[id][i].fotoPrincipal!=null){
                                        hot.fotoPrincipal = hotelesVendidos[id][i].fotoPrincipal;
                                    }
                                    hoteles.hotels.splice(j,1);
                                    arrResHot.push(hot);
                                    break;
                                }
                            }
                        }
                        hoteles.hotels = arrResHot.concat(hoteles.hotels);
                    }
                    if(p==1 && hotelesProspecto[id]){
                        for(var i=0;i<hotelesProspecto[id].length;i++){
                            for(var j in hoteles.hotels){
                                if(hoteles.hotels[j].id==hotelesProspecto[id][i].hid){
                                    var hot = hoteles.hotels[j];
                                    if(hotelesProspecto[id][i].fotoPrincipal!=null){
                                        hot.fotoPrincipal = hotelesProspecto[id][i].fotoPrincipal;
                                        
                                    }
                                    if(hotelesProspecto[id][i].customPost!=null){
                                        hot.customPost = hotelesProspecto[id][i].customPost;
                                        
                                    }
                                    if(hotelesProspecto[id][i].customPictures!=null){
                                        for(var k in hotelesProspecto[id][i].customPictures){
                                            hotelesProspecto[id][i].customPictures[k] = URL_CUSTOM_PICTURES + hotelesProspecto[id][i].customPictures[k];
                                        }
                                        hot.pictures = hotelesProspecto[id][i].customPictures.concat(hot.pictures);
                                        
                                    }
                                    break;
                                }
                            }
                        }
                        hoteles.hotels.splice((hoteles.hotels.length-hotelesProspecto[id].length-1),hotelesProspecto[id].length);
                       
                    }
                    res.json(hoteles);
                });
           
        });
    }
};

