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
                PCM:[{hid:352782 ,fotoPrincipal:URL_CUSTOM_PICTURES+"352782/ppcmain.jpg"},{hid:353356,fotoPrincipal:null}],
                MTY:[{hid:866114},{hid:865632}]
            };
      

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
        console.log("id",id)
        Recinto.findOne(id).populate("amenities").then(function(hotel){
            
            res.json(hotel);
        })


        /*var options = {
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
            
        });*/

    },
    findByCiudadId: function(req,res){
        var idciudad = req.param('id');
        var page = req.param('p')
        var pagesize = 12;
        if(!page)page = 1;
        else page++;
        if(page ==1){
            pagesize = 11;
        }
        console.log("id ciudad",idciudad)
        console.log("page",page)
        console.log("pagesize",pagesize)
        Recinto.findOne({cityId:idciudad}).then(function(data){
            if(!data){
                CityService.importCity(idciudad).then(function(data){
                    return res.json(data);
                }).catch(function(err){
                    console.log(err);
                    res.error(err);
                })
            }else{
                Recinto.find({cityId:idciudad}).paginate({page: page, limit: pagesize}).then(function(data){
                    return res.json(data);
                })
            }
        });
    }
};

