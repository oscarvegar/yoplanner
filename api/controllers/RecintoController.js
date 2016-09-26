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
                    return res.json(data);
                }).catch(function(err){
                    console.log(err);
                    res.json([]);
                })
            }else{
                Recinto.find().where({cityId:condition}).paginate({page: page, limit: pagesize}).populate('comentarios').sort("place DESC").sort("starRating DESC").then(function(data){
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
      console.log('Getting email from:', id);
      Recinto.findOne({id: id}).then(function(data) {
        return res.json({id: data.id, email: data.correoPrincipal || ''});
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
      if (!parametros.onestar && !parametros.twostar && !parametros.threestar && !parametros.fourstar && !parametros.fivestar) {
        estrellas = [1, 2, 3, 4, 5];
      }
      var busqueda = {
        starRating: estrellas
      }
      if (parametros.nombre.name) {
        busqueda.name = {
          'contains': parametros.nombre.name
        };
      }
      if (parametros.plan) {
        if (parametros.plan == 'Todo Incluido' || parametros.plan == 'Europeo') {
          busqueda.plan = parametros.plan;
        }
      }
      if (parametros.salones) {
        busqueda.numeroSalones = {
          '>=': parametros.salones
        };
      }
      if (parametros.habitaciones) {
        busqueda.totalHabitaciones = {
          '>=': parametros.habitaciones
        };
      }
      if (parametros.suites) {
        busqueda.totalSuites = {
          '>=': parametros.suites
        };
      }
      if (parametros.unacama) {
        busqueda.totalUnaCama = {
          '>=': parametros.unacama
        };
      }
      if (parametros.doscamas) {
        busqueda.totalDosCamas = {
          '>=': parametros.doscamas
        };
      }
      if (parametros.metroscuadrados) {
        busqueda.metrosTotales = {
          '>=': parametros.metroscuadrados
        };
      }
      if (parametros.masgrandecuadrados) {
        busqueda.salonMasGrandeMetros = {
          '>=': parametros.masgrandecuadrados
        };
      }
      if (parametros.maxcapacidadsalon) {
        busqueda.salonMasGrandePersonas = {
          '>=': parametros.maxcapacidadsalon
        };
      }
      busqueda.cityId = cityId;
      Recinto.find(busqueda).sort("place DESC").sort("starRating DESC").then(function (hoteles) {
        console.log('HOTELES BUSCAR', hoteles.length);
        return res.json(hoteles);
      }).catch(console.log);
    },

    getRatings: function (req, res) {
      var id = req.param('id');
      var tempRatings = [];
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
      Recinto.findOne({id: id}).then(function (hotel) {
        if (!hotel.ratings) {
          var tempRate = [{user: user, rating: rating}];
        } else {
          var inList = false;
          for (var i in hotel.ratings) {
            if (hotel.ratings[i].user == user) {
              hotel.ratings[i].rating = rating;
              inList = true;
              break;
            }
          }
          if (!inList) {
            hotel.ratings.push({user: user, rating: rating});
          }
          var tempRate = hotel.ratings;
        }
        Recinto.update({id: hotel.id}, {ratings: tempRate}).then(function (hotel) {
          return res.json({hotel: hotel[0]});
        }).catch(console.log);
      }).catch(console.log);
    },

    rateDestino: function (req, res) {
      var iduser = req.param('iduser');
      var rating = req.param('rating');
      var user = req.user.id;
      User.findOne({id: iduser}).then(function(data) {
        if (!data.destino.ratings) {
          var tempRate = [{user: user, rating: rating}];
        } else {
          for (var i in data.destino.ratings) {
            if (data.destino.ratings[i].user == user) {
              data.destino.ratings[i].rating = rating;
              break;
            }
          }
          var tempRate = data.destino.ratings;
        }
        data.destino.ratings = tempRate;
        User.update({id: data.id}, {destino: data.destino}).then(function(destinoupdate) {
          return res.json(destinoupdate[0]);
        }).catch(console.log);
      }).catch(console.log);
    },

    getRatingsDestino: function (req, res) {
      var id = req.param('id');
      var tempRatings = [];
      User.findOne({id: id}).then(function (destino) {
        if (!destino.destino.ratings) {
          tempRatings = [];
        } else {
          tempRatings = destino.destino.ratings;
        }
        return res.json({ratings: tempRatings});
      }).catch(console.log);
    },

    getBackgroundDestino: function (req, res) {
      var id = req.param('id');
      Destino.findOne({cityId: id}).then(function(data) {
        console.log(data);
        return res.json({foto: data.fotoPrincipal ? data.fotoPrincipal : 'img/yp-backgrounds/ACA/Hoteles en Acapulco.jpg'});
      }).catch(function (err) {
        console.log(err);
        return res.json({foto: 'img/yp-backgrounds/ACA/Hoteles en Acapulco.jpg'});
      });
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
    },

    isOnFav: function (req, res) {
      var user = req.user.id;
      var idhotel = req.param('id');
      User.findOne({id: user}).then(function (hotel) {
        hotel.favoritos.forEach(function (hotelfav) {
          if (hotelfav === idhotel) {
            return res.json({isFav: true});
          } else {
            if (hotel.favoritos.indexOf(idhotel) > -1) {
              return res.json({isFav: true});
            }
            return res.json({isFav: false});
          }
        });
      }).catch(console.log);
    },

    addFav: function (req, res) {
      var userid = req.user.id;
      var idhotel = req.param('id');
      User.findOne({id: userid}).then(function (user) {
        if (!user.favoritos) {
          user.favoritos = [];
        }
        user.favoritos.push(idhotel);
        User.update({id: userid}, {favoritos: user.favoritos}).then(function (users) {
          return res.json(users[0]);
        }).catch(console.log);
      }).catch(console.log);
    },

    removeFav: function (req, res) {
      var userid = req.user.id;
      var idhotel = req.param('id');
      User.findOne({id: userid}).then(function (user) {
        user.favoritos.splice(user.favoritos.indexOf(idhotel), 1);
        User.update({id: userid}, {favoritos: user.favoritos}).then(function (users) {
          return res.json(users[0]);
        }).catch(console.log);
      }).catch(console.log);
    },

    isLiked: function (req, res) {
      var user = req.user.id;
      var idhotel = req.param('id');
      Recinto.findOne({id: idhotel}).then(function (hotel) {
        if (!hotel.likes || hotel.likes.length <= 0) {
          return res.json({isLiked: false});
        }
        for (var i in hotel.likes) {
          if (hotel.likes[i] == user) {
            return res.json({isLiked: true});
          } else {
            if (hotel.likes.indexOf(user) > -1) {
              return res.json({isLiked: true});
            }
            return res.json({isLiked: false});
          }
        }
      }).catch(console.log);
    },

    likeHotel: function (req, res) {
      var user = req.user.id;
      var idhotel = req.param('id');
      Recinto.findOne({id: idhotel}).then(function (hotel) {
        if (!hotel.likes) {
          hotel.likes = [];
        }
        hotel.likes.push(user);
        Recinto.update({id: idhotel}, {likes: hotel.likes}).then(function (hotelupdate) {
          return res.json(hotelupdate[0]);
        }).catch(console.log);
      }).catch(console.log);
    },

    notlikeHotel: function (req, res) {
      var user = req.user.id;
      var idhotel = req.param('id');
      Recinto.findOne({id: idhotel}).then(function (hotel) {
        hotel.likes.splice(hotel.likes.indexOf(user), 1);
        Recinto.update({id: idhotel}, {likes: hotel.likes}).then(function (hotelupdate) {
          return res.json(hotelupdate[0]);
        }).catch(console.log);
      }).catch(console.log);
    },

    getfavlist: function (req, res) {
      var user = req.user.id;
      User.findOne({id: user}).then(function(data) {
        return res.json({favlist: data.favoritos});
      }).catch(console.log);
    },

    findByIdAndCiudad: function (req, res) {
      var idhotel = req.param('id');
      var idciudad = req.param('ciudad');
      Recinto.findOne({id: idhotel}).then(function(data) {
        console.log('DATA HOTEL', data);
        if (data.cityId == idciudad) {
          return res.json({hotel: data});
        } else {
          return res.json({error: true, message: 'Hotel no es del destino actual.'});
        }
      });
    },

    addVisita: function (req, res) {
      var idhotel = req.param('id');
      var ip = req.ip;
      var fecha = new Date().toISOString();

      Recinto.findOne({id: idhotel}).then(function(data) {
        data.visitas = data.visitas ? data.visitas : [];
        data.visitas.push({
          ip: ip,
          fecha: fecha
        });
        Recinto.update({id: data.id}, {visitas: data.visitas}).then(function(data) {
          console.log('Añadida visita a', data[0].name);
          return res.json(data[0]);
        }).catch(console.log);
      }).catch(console.log);
    },

    getsalonpdf: function (req, res) {
      var id = req.param('id');
      Recinto.findOne({id: id}).then(function(data) {
        return res.json(data.salonPDF ? data.salonPDF : []);
      }).catch(console.log);
    }
};
