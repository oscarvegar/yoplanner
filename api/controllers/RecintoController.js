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
var URL_CUSTOM_PICTURES = "./img/hoteles/";

 var hotelesVendidos = {
                MEX:[{hid:526622},{hid:290736,fotoPrincipal:URL_PICTURES+"76d2fcbd-2e64-4526-9fc9-87ffe4caf25c"}],
                CVJ:[{hid:264485,fotoPrincipal:URL_PICTURES+"ffea4faa-f894-4db2-8e4b-8bfe7786c3fc"}],
                CUN:[{hid:266041},{hid:681932},{hid:563172},{hid:214692}],
                RM0:[{hid:266041},{hid:681932},{hid:214570},{hid:563172},{hid:214692}], 
                //SD6:[{hid:485792,customPost:"https://plus.google.com/113624413123385492768/posts/dG3ebJ4zR5D"}],
                /*SD6:[{hid:363032 ,fotoPrincipal:URL_CUSTOM_PICTURES+"363032/main.jpg"
                ,customPictures:["363032/1.jpg","363032/2.jpg","363032/3.jpg","363032/4.jpg","363032/5.jpg","363032/6.jpg","363032/7.jpg","363032/8.jpg","363032/9.jpg","363032/10.jpg","363032/11.jpg","363032/12.jpg","363032/13.jpg","363032/14.jpg","363032/15.jpg","363032/16.jpg","363032/17.jpg","363032/18.jpg","363032/19.jpg","363032/20.jpg","363032/21.jpg","363032/22.jpg","363032/23.jpg"]},{hid:276089},{hid:485792,customPost:"https://plus.google.com/113624413123385492768/posts/dG3ebJ4zR5D"}],
                SJD:[{hid:363032 ,fotoPrincipal:URL_CUSTOM_PICTURES+"363032/main.jpg"
                ,customPictures:["363032/1.jpg","363032/2.jpg","363032/3.jpg","363032/4.jpg","363032/5.jpg","363032/6.jpg","363032/7.jpg","363032/8.jpg","363032/9.jpg","363032/10.jpg","363032/11.jpg","363032/12.jpg","363032/13.jpg","363032/14.jpg","363032/15.jpg","363032/16.jpg","363032/17.jpg","363032/18.jpg","363032/19.jpg","363032/20.jpg","363032/21.jpg","363032/22.jpg","363032/23.jpg"]},{hid:276089},{hid:485792,customPost:"https://plus.google.com/113624413123385492768/posts/dG3ebJ4zR5D"}],
                CL1:[{hid:363032 ,fotoPrincipal:URL_CUSTOM_PICTURES+"363032/main.jpg"
                ,customPictures:["363032/1.jpg","363032/2.jpg","363032/3.jpg","363032/4.jpg","363032/5.jpg","363032/6.jpg","363032/7.jpg","363032/8.jpg","363032/9.jpg","363032/10.jpg","363032/11.jpg","363032/12.jpg","363032/13.jpg","363032/14.jpg","363032/15.jpg","363032/16.jpg","363032/17.jpg","363032/18.jpg","363032/19.jpg","363032/20.jpg","363032/21.jpg","363032/22.jpg","363032/23.jpg"]},{hid:276089},{hid:485792,customPost:"https://plus.google.com/113624413123385492768/posts/dG3ebJ4zR5D"}],
                */
                SD6:[{hid:276089,fotoPrincipal: 'http://media.staticontent.com/media/pictures/5957a8d2-5169-45ca-b31e-61fff5a11e42'},{hid:485792,customPost:"https://plus.google.com/113624413123385492768/posts/dG3ebJ4zR5D"}],
                SJD:[{hid:276089,fotoPrincipal: 'http://media.staticontent.com/media/pictures/5957a8d2-5169-45ca-b31e-61fff5a11e42'},{hid:485792,customPost:"https://plus.google.com/113624413123385492768/posts/dG3ebJ4zR5D"}],
                CL1:[{hid:276089,fotoPrincipal: 'http://media.staticontent.com/media/pictures/5957a8d2-5169-45ca-b31e-61fff5a11e42'},{hid:485792,customPost:"https://plus.google.com/113624413123385492768/posts/dG3ebJ4zR5D"}],                
                ZLO:[{hid:354456,fotoPrincipal:URL_CUSTOM_PICTURES+"354456/354456-main.jpg",video:"https://youtu.be/zb4e1MTv3V4",description:"El Hotel Grand Isla Navidad Resort está ubicado frente a la Laguna de Barra de Navidad y a 70 km del centro de Manzanillo. El Aeropuerto Internacional Playa de Oro se encuentra a 31 km de la propiedad. Dispone de conexión Wi-Fi gratuita en habitaciones, salones y áreas públicas y piscinas descubiertas. Todas las habitaciones están equipadas con aire acondicionado, TV LCD satelital, caja fuerte digital y baño privado con tina y amenidades de lujo. El establecimiento alberga 3 restaurantes que sirven desde desayuno buffet hasta platillos regionales, nacionales e internacionales. Además, ofrece servicio a la habitación las 24h. Los servicios incluyen spa y sala de masajes, gimnasio, estacionamiento gratuito y canchas de tenis y un campo de golf de clase mundial de 27 hoyos."}],
                PCM:[{hid:352782 ,fotoPrincipal:URL_CUSTOM_PICTURES+"352782/ppcmain.jpg"},{hid:353356,fotoPrincipal:null}]};
      

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
            response = JSON.parse(response);
            if(response && response.hotels) {
                for(var i in response.hotels){
                    for(var k in hotelesVendidos[response.hotels[i].cityId]){
                        var hot = hotelesVendidos[response.hotels[i].cityId][k];
                        response.hotels[i].video = hot.video;
                        response.hotels[i].description = hot.description?hot.description:response.hotels[i].description;
                        response.hotels[i].fotoPrincipal = hot.fotoPrincipal?hot.fotoPrincipal:response.hotels[i].fotoPrincipal;    

                    }
                    for(var j in response.hotels[i].pictures){
                        response.hotels[i].pictures[j] = URL_PICTURES + response.hotels[i].pictures[j];
                    }
                }
            }
            options.path="/hotels/"+id+"/reviews?pagesize=5";
            HttpClientService.httpsGET(options,function(rews){
                rews = JSON.parse(rews);
                if(rews && response && response.hotels[0]) {
                    response.hotels[0].reviews = rews.reviews;
                }
                console.log("paramsid",id,response)
                return res.json(response);
            })
            
        });

    },
    findByCiudadId: function(req,res){
         
        var hotelesProspecto = {
                MEX:[{hid:291554},{hid:642043},{hid:572877}],
                PVR:[{hid:643681}], //puerto vallarta
                CUN:[{hid:681932,customPost:"https://plus.google.com/113624413123385492768/posts/bdoPUUzwCmw",fotoPrincipal:URL_CUSTOM_PICTURES+"681932/Four Points Cancun.jpg",customPictures:["681932/Four Points Cancun.jpg","681932/Four Points Cancun 2.jpg"]}]};
        var resSize = 11;
        var id = req.allParams().id;
        sails.log.info("ID",id)
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
                var restaVendidos = 0;
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
                        restaVendidos = hotelesVendidos[id].length;
                        for(var i in hotelesVendidos[id]){
                            ids += hotelesVendidos[id][i].hid+",";
                        }
                    }
                }
                availability:
                for(var d in data.availability){
                    if(d>=(resSize - restaVendidos +(p*resSize)))
                        break;
                    else if(d<(resSize*p)){
                        continue;
                    }
                    //verifica si ya existe el id en la consulta
                    var items = ids.split(",");
                    if(data.availability[d].hotel) {
                        for(var s in items){
                            if(items[s]==data.availability[d].hotel.id){
                                resSize+=1;
                                continue availability;
                            }
                        }
                        ids += data.availability[d].hotel.id+",";
                    }

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
                                    if(hotelesVendidos[id][i].customPost!=null){
                                        hot.customPost = hotelesVendidos[id][i].customPost;
                                        
                                    }
                                    if(hotelesVendidos[id][i].customPictures!=null){
                                        for(var k in hotelesVendidos[id][i].customPictures){
                                            hotelesVendidos[id][i].customPictures[k] = URL_CUSTOM_PICTURES + hotelesVendidos[id][i].customPictures[k];
                                        }
                                        //hot.pictures = hotelesVendidos[id][i].customPictures.concat(hot.pictures);
                                        hot.pictures = hotelesVendidos[id][i].customPictures;
                                        
                                    }
                                    hot.description = hotelesVendidos[id][i].description?hotelesVendidos[id][i].description:hot.description;
                                    hot.video = hotelesVendidos[id][i].video?hotelesVendidos[id][i].video:"";
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

