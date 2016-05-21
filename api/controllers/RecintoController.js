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


var AGRUPADORES_CIUDAD = [["SD6","SJD","CL1"]];      

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


    },
    findByCiudadId: function(req,res){
        var idciudad = req.param('id');
        var page = req.param('p')
        var pagesize = 12;
        if(!page)page = 1;
        else page++;
        if(page ==1){
            //pagesize = 11;
            
        }
        console.log("id ciudad",idciudad)
        console.log("page",page)
        console.log("pagesize",pagesize)
        var condition = idciudad;
        for(var i in AGRUPADORES_CIUDAD){
            if(AGRUPADORES_CIUDAD[i].indexOf(idciudad)>=0){
                condition = AGRUPADORES_CIUDAD[i];
                break;
            }
        }
        Recinto.findOne().where({cityId:condition}).then(function(data){
            if(!data){
                CityService.importCity(idciudad).then(function(data){
                    console.log("aqui regresa del import",data)
                    return res.json(data);
                }).catch(function(err){
                    console.log(err);
                    res.json([]);
                })
            }else{
                Recinto.find().where({cityId:condition}).paginate({page: page, limit: pagesize}).sort("place DESC").sort("starRating DESC").then(function(data){
                    console.log("data res",data)
                    return res.json(data);
                })
            }
        });
    },

    images:function(req,res){
        res.redirect(sails.config.constants.CUSTOM_PICTURES+req.param('id'));
    }
};

