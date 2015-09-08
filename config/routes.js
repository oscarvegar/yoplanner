/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  'post /deploy': 'DeployController.webhook',
  '/':'MainController.root',
  

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
  'GET /agencia_de_viajes': '/#/agencia_de_viajes',
  'GET /aviso_de_privacidad': '/#/aviso_de_privacidad',
  'GET /contacto': '/#/contacto',
  'GET /cruceros': '/#/cruceros',
  'GET /meetings': '/#/meetings',
  'GET /publicidad_para_hoteles': '/#/publicidad_para_hoteles',
  'GET /quienes_somos': '/#/quienes_somos',
  'GET /reservaciones_de_hotel': '/#/reserva/hotels',
  'GET /reservaciones_de_avion': '/#/reserva/flights',
  'GET /hoteles_en_acapulco': '/#/hoteles_en_acapulco',
  'GET /hoteles_en_los_cabos': '/#/hoteles_en_los_cabos',
  'GET /hoteles_en_cancun': '/#/hoteles_en_cancun',
  'GET /hoteles_en_cuernavaca': '/#/hoteles_en_cuernavaca',
  'GET /hoteles_en_cozumel': '/#/hoteles_en_cozumel',
  'GET /hoteles_en_guadalajara': '/#/hoteles_en_guadalajara',
  'GET /hoteles_en_huatulco': '/#/hoteles_en_huatulco',
  'GET /hoteles_en_ixtapa': '/#/hoteles_en_ixtapa',
  'GET /hoteles_en_ciudad_de_mexico': '/#/hoteles_en_ciudad_de_mexico',
  'GET /hoteles_en_monterrey': '/#/hoteles_en_monterrey',
  'GET /hoteles_en_mazatlan': '/#/hoteles_en_mazatlan',
  'GET /hoteles_en_nuevo_vallarta': '/#/hoteles_en_nuevo_vallarta',
  'GET /hoteles_en_pachuca': '/#/hoteles_en_pachuca',
  'GET /hoteles_en_puebla': '/#/hoteles_en_puebla',
  'GET /hoteles_en_playa_del_carmen': '/#/hoteles_en_playa_del_carmen',
  'GET /hoteles_en_puerto_vallarta': '/#/hoteles_en_puerto_vallarta',
  'GET /hoteles_en_queretaro': '/#/hoteles_en_queretaro',
  'GET /hoteles_en_riviera_maya': '/#/hoteles_en_riviera_maya',
  'GET /hoteles_en_cabo_san_lucas': '/#/hoteles_en_cabo_san_lucas',
  'GET /hoteles_en_san_jose_del_cabo': '/#/hoteles_en_san_jose_del_cabo',
  'GET /hoteles_en_toluca': '/#/hoteles_en_toluca',
  'GET /hoteles_en_manzanillo': '/#/hoteles_en_manzanillo',
  'GET /blog': '/#/blog',
  'GET /blog/:year/:month/:id': 'BlogController.getPost',


};
