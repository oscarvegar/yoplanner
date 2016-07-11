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
    },

    getContactoInfo: function (req, res) {
      var idhotel = req.param('id');
      User.find({ hotels: [idhotel] }).then(function (user) {
        return res.json(user);
      }).catch(console.log);
    },

    getHotelEmail: function (req, res) {
      var id = req.param('id');
      User.find({ hotels: [id] }).then(function (user) {
        if (user.length > 0) {
          return res.json({email: user[0].username, id: id});
        } else {
          return res.json({email: 'perfil_sin_mail', id: id});
        }
      }).catch(console.log);
    },

    findBySearch: function (req, res) {
      var parametros = req.param('buscar');
      var cityId = req.param('id');
      //Estrellas
      var estrellas = [];
      var tipo_plan = 'default';
      if (parametros.onestar) {
        estrellas.push(1);
      }
      if (parametros.twostar) {
        estrellas.push(2);
      }
      if (parametros.threestar) {
        estrellas.push(3);
      }
      if (parametros.fourstar) {
        estrellas.push(4);
      }
      if (parametros.fivestar) {
        estrellas.push(5);
      }
      if (parametros.plan == 'default') {
        var busqueda = {
          name: {
            'contains': parametros.nombre.name
          },
          /*numeroSalones: {
            '>=': parametros.salones
          },
          totalHabitaciones: {
            '>=': parametros.habitaciones
          },*/
          starRating: estrellas,
          cityId: cityId
        };
      } /*else {
        var busqueda = {
          name: {
            'contains': parametros.nombre.name
          },
          numeroSalones: {
            '>=': parametros.salones
          },
          totalHabitaciones: {
            '>=': parametros.habitaciones
          },
          starRating: estrellas,
          plan: parametros.plan
        };
      }*/
      //Retornar json
      Recinto.find({
        name: {
          'contains': parametros.nombre.name
        },
        starRating: estrellas,
        cityId: cityId
      }).sort("place DESC").sort("starRating DESC").then(function (hoteles) {
        console.log('HOTELES BUSCAR', hoteles.length);
        return res.json(hoteles);
      }).catch(console.log);
    },

    getRatings: function (req, res) {
      var id = req.param('id');
      Recinto.findOne({id: id}).then(function (hotel) {
        if (!hotel.ratings) {
          tempRatings = [];
        } else {
          tempRatings = hotel.ratings;
        }
        return res.json({ratings: tempRatings});
      }).catch(console.log);
    },

    rateHotel: function (req, res) {
      var id = req.param('hotel');
      var rating = req.param('rating');
      var user = req.user.id;
      var tempRate = [];
      Recinto.findOne({id: id}).then(function (hotel) {
        if (!hotel.ratings) {
          tempRate.push({user: user, rating: rating});
        } else {
          for (var i in hotel.ratings) {
            if (hotel.ratings[i].user == user) {
              hotel.ratings[i].rating = rating;
              break;
            }
          }
          tempRate = hotel.ratings;
        }
        Recinto.update({id: id}, {ratings: tempRate}).then(function (hotel) {
          return res.json({hotel: hotel[0]});
        }).catch(console.log);
      }).catch(console.log);
    },

    getUserRating: function (req, res) {
      var id = req.param('id');
      var user = req.user.id;
      Recinto.findOne({id: id}).then(function (hotel) {
        if (!hotel.ratings) {
          tempRating = 0;
        } else {
          for (var i in hotel.ratings) {
            if (hotel.ratings[i].user == user) {
              tempRating = hotel.ratings[i].rating;
              break;
            }
          }
        }
        return res.json({rating: tempRating});
      }).catch(console.log);
    }
};
