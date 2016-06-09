/**
 * DestinoController
 *
 * @description :: Server-side logic for managing Destinoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _DESTINOS = {
	"/hoteles-en-acapulco":{
		title:"Hoteles en Acapulco",
		keywords:"hoteles en acapulco,hoteles acapulco,acapulco hoteles,hoteles economicos en acapulco,paquetes vacacionales,hoteles en acapulco todo incluido,hoteles baratos en acapulco,hoteles en acapulco economicos,hoteles de acapulco,hotel en acapulco,hoteles todo incluido en acapulco,acapulco todo incluido",
		description:"Encuentra los mejores hoteles en Acapulco con Yo Planner, descubre las diferentes opciones con las mejores tarifas para cotizar los hoteles en Acapulco que necesitas.",
		image:""
	},
	"/hoteles-en-los-cabos":{
		title:"Hoteles en Los Cabos",
		keywords:"hoteles en los cabos,hoteles los cabos,hoteles en cabo san lucas,hoteles cabo san lucas,los cabos san lucas hoteles,cabo san lucas hoteles,hoteles los cabos san lucas,hoteles en cabos san lucas,hoteles en los cabos mexico,hoteles cabos san lucas,hoteles de cabo san lucas,hoteles en los cabos bcs,cabos san lucas hoteles,hoteles cabo san lucas economicos",
		description:"Encuentra los mejores hoteles en Los Cabos con Yo Planner, descubre las diferentes opciones con las mejores tarifas para cotizar los hoteles en Los Cabos.",
		image:""
	},
	"/hoteles-en-cancun":{
		title:"Hoteles en Cancún",
		keywords:"cancun hoteles,hoteles en cancun todo incluido,hoteles todo incluido en cancun,hoteles baratos en cancun,hoteles cancun todo incluido,hoteles economicos en cancun,hoteles en cancun zona hotelera,hoteles en cancun economicos,hoteles en cancun baratos,mejores hoteles en cancun,hoteles todo incluido cancun,hoteles cancun zona hotelera,cancun hoteles todo incluido,los mejores hoteles de cancun,hoteles en cancun centro,hoteles baratos cancun,hoteles cancun centro,hoteles de lujo en cancun,los mejores hoteles en cancun,lista de hoteles en cancun,hoteles gran turismo en cancun,hoteles en cancun mexico,trabajos en hoteles de cancun,empleos en hoteles de cancun,hoteles de cancun quintana roo,hoteles a cancun,empleos hoteles cancun,trabajo en hoteles de cancun,todos los hoteles de cancun,cancun mexico hoteles,hoteles cerca de cancun,hoteles en la zona hotelera cancun",
		description:"¡Vive Cancún! Encuentra hoteles en Cancún, visita nuestra seccion y cotiza diferentes opciones de hoteles en Cancún.",
		image:""
	},
	"/hoteles-en-riviera-maya":{
		title:"Hoteles en Riviera Maya",
		keywords:"hoteles riviera maya,hoteles en riviera maya,hoteles en la riviera maya,riviera maya hoteles,hoteles riviera maya todo incluido,hoteles todo incluido riviera maya,hoteles en la riviera maya todo incluido,hoteles en riviera maya todo incluido,hoteles dela riviera maya,hoteles todo incluido en riviera maya,hoteles todo incluido en la riviera maya,riviera maya hoteles todo incluido,hoteles riviera maya todo incluido promociones,mejores hoteles en riviera maya,hoteles de la riviera maya,hoteles riviera maya 5 estrellas,mejores hoteles riviera maya,hoteles all inclusive riviera maya,hoteles riviera maya promociones,hoteles de riviera maya,hoteles en la riviera maya todo incluido promociones,mejores hoteles en la riviera maya,riviera maya hoteles todo incluido ofertas,hoteles solo adultos riviera maya,hoteles riviera maya solo adultos,promociones hoteles riviera maya,ofertas hoteles riviera maya,los mejores hoteles dela riviera maya,los mejores hoteles en la riviera maya,hoteles en riviera maya para niños,hoteles iberostar riviera maya,hoteles para niños en riviera maya,hoteles iberostar en riviera maya,promociones de hoteles en la riviera maya,hoteles en riviera maya todo incluido ofertas,hoteles en cancun riviera maya,hoteles en la riviera maya para niños,hoteles gran turismo riviera maya,lista de hoteles en la riviera maya,hoteles baratos en riviera maya,riviera maya hoteles 5 estrellas,hoteles en la riviera,mejores hoteles dela riviera maya,hoteles riviera maya cancun,hoteles riviera maya all inclusive,hoteles de lujo en riviera maya,hoteles baratos riviera maya,hoteles todo incluido riviera maya promociones,ofertas de hoteles en riviera maya,hoteles de lujo en la riviera maya,los mejores hoteles de riviera maya,hoteles para niños en la riviera maya,hoteles economicos en riviera maya,promocion hoteles riviera maya,hoteles cancun riviera maya,la riviera maya hoteles,hoteles riviera maya para niños,ofertas de hoteles en la riviera maya,hoteles riviera maya todo incluido ofertas,hoteles dela riviera maya todo incluido,hoteles en riviera maya cancun,hoteles la riviera maya,promociones de hoteles en riviera maya,hoteles en cancun y riviera maya,lista de hoteles en riviera maya,los mejores hoteles en riviera maya,cancun riviera maya hoteles,hoteles todo incluido riviera maya ofertas,hoteles de lujo riviera maya,promociones de hoteles todo incluido en la riviera maya,hoteles para niños riviera maya,hoteles hard rock riviera maya,mejores hoteles de riviera maya,lista de hoteles riviera maya,promociones hoteles riviera maya todo incluido,promociones hoteles todo incluido riviera maya,ofertas hoteles todo incluido riviera maya,paquetes de hoteles en la riviera maya todo incluido,hoteles en la riviera maya cancun,hoteles para bodas en riviera maya,oferta hoteles riviera maya,ofertas hoteles riviera maya todo incluido,riviera maya cancun hoteles,hoteles de riviera maya todo incluido,hoteles palace riviera maya,los mejores hoteles riviera maya,hoteles todo incluido cancun y riviera maya,hoteles en cancun y riviera maya todo incluido,hoteles en riviera maya cancun todo incluido",
		description:"Las opciones de hoteles en Rivera Maya se adaptan a tus necesidades. Visita nuestra seccion de hoteles en Riviera Maya y cotiza con nosotros.",
		image:""
	},
	"/hoteles-en-playa-del-carmen":{
		title:"Hoteles en Playa del Carmen",
		keywords:"Playa del Carmen hoteles,hoteles en Playa del Carmen todo incluido,hoteles todo incluido en Playa del Carmen,hoteles baratos en Playa del Carmen,hoteles Playa del Carmen todo incluido,hoteles economicos en Playa del Carmen,hoteles en Playa del Carmen zona hotelera,hoteles en Playa del Carmen economicos,hoteles en Playa del Carmen baratos,mejores hoteles en Playa del Carmen,hoteles todo incluido Playa del Carmen,hoteles Playa del Carmen zona hotelera,Playa del Carmen hoteles todo incluido,los mejores hoteles de Playa del Carmen,hoteles en Playa del Carmen centro,hoteles baratos Playa del Carmen,hoteles Playa del Carmen centro,hoteles de lujo en Playa del Carmen,los mejores hoteles en Playa del Carmen,lista de hoteles en Playa del Carmen,hoteles gran turismo en Playa del Carmen,hoteles en Playa del Carmen mexico,trabajos en hoteles de Playa del Carmen,empleos en hoteles de Playa del Carmen,hoteles de Playa del Carmen quintana roo,hoteles a Playa del Carmen,empleos hoteles Playa del Carmen,trabajo en hoteles de Playa del Carmen,todos los hoteles de Playa del Carmen,Playa del Carmen mexico hoteles,hoteles cerca de Playa del Carmen,hoteles en la zona hotelera Playa del Carmen",
		description:"Hoteles en Playa del Carmen, tenemos una gran cantidad de opciones para ti. Entra ya y reserva tu hotel en Playa del Carmen para tus próximas vacaciones.",
		image:""
	},
	"/hoteles-en-cozumel":{
		title:"Hoteles en Cozumel",
		keywords:"hoteles en cozumel,hoteles cozumel,cozumel hoteles,hoteles isla mujeres,hoteles en cozumel todo incluido,hoteles en cozumel economicos,hoteles cozumel todo incluido,hoteles de cozumel,hoteles todo incluido cozumel,cozumel hoteles todo incluido,hoteles en cozumel 5 estrellas,hoteles en cozumel baratos,hoteles cozumel economicos,asociacion de hoteles de cozumel,hoteles en cozumel mexico,isla cozumel hoteles,precios de hoteles en cozumel,cozumel hoteles economicos,hoteles cozumel all inclusive,cozumel mexico hoteles,hoteles en cozumel ofertas",
		description:"Los mejores hoteles en Cozumel los tenemos para ti. Visita nuestra seccion de Hoteles en Cozumel y plane a ya tus próximas vacaciones con nosotros.",
		image:""
	},
	"/hoteles-en-queretaro":{
		title:"Hoteles en Querétaro",
		keywords:"hoteles en queretaro centro,queretaro hoteles,hoteles en querétaro",
		description:"¿Buscas hotel en Queretaro? Tenemos grandes opciones de hoteles en Queretaro para todos los presupuesto. ¡Entra y cotiza!",
		image:""
	},
	"/hoteles-en-puebla":{
		title:"Hoteles en Puebla",
		keywords:"hoteles en Puebla,hoteles Puebla,Puebla hoteles,hoteles economicos en Puebla,paquetes vacacionales,hoteles en Puebla todo incluido,hoteles baratos en Puebla,hoteles en Puebla economicos,hoteles de Puebla,hotel en Puebla,hoteles todo incluido en Puebla,Puebla todo incluido",
		description:"¿Requieres un hotel en Puebla? Nosotros no tenemos una, sino muchas opciones para ti. Descubre una gran variedad de hoteles en Puebla y cotiza con nosotros.",
		image:""
	},
	"/hoteles-en-huatulco":{
		title:"Hoteles en Huatulco",
		keywords:"hoteles en huatulco,hoteles huatulco,huatulco hoteles,hoteles en huatulco todo incluido,hoteles huatulco todo incluido,hoteles de huatulco,hoteles todo incluido en huatulco,hoteles economicos en huatulco,hoteles en huatulco 5 estrellas,huatulco hoteles todo incluido,hoteles baratos en huatulco,hoteles todo incluido huatulco,hoteles en huatulco oaxaca,hoteles en huatulco baratos,hoteles en huatulco con playa,hoteles en huatulco todo incluido ofertas,hoteles en huatulco economicos,hoteles en huatulco 4 estrellas,hoteles en bahias de huatulco,hoteles en huatulco precios,bahias de huatulco hoteles,hoteles en huatulco cerca de la playa,hoteles huatulco economicos,huatulco hoteles economicos,hoteles huatulco 5 estrellas,hoteles huatulco todo incluido promociones,hoteles 5 estrellas en huatulco,hoteles huatulco 4 estrellas,huatulco oaxaca hoteles,mejores hoteles en huatulco,hoteles economicos huatulco,hoteles en la crucecita huatulco,hoteles de huatulco 5 estrellas,precios de hoteles en huatulco,hoteles en huatulco 3 estrellas,hoteles all inclusive huatulco,los mejores hoteles de huatulco,hoteles con playa en huatulco,huatulco hoteles baratos,hoteles economicos en huatulco oaxaca,hoteles todo incluido en huatulco oaxaca,hoteles bahias de huatulco,hoteles huatulco oaxaca,promociones de hoteles en huatulco,hoteles huatulco 3 estrellas,hoteles de huatulco todo incluido,promociones hoteles en huatulco,hoteles baratos huatulco,hoteles huatulco con playa,hoteles 4 estrellas en huatulco,hoteles 3 estrellas en huatulco,hoteles de lujo en huatulco,mejores hoteles de huatulco,los mejores hoteles en huatulco,hoteles 5 estrellas huatulco,precio de hoteles en huatulco,ofertas de hoteles en huatulco,hoteles de huatulco economicos,lista de hoteles en huatulco,hoteles huatulco precios,hoteles de huatulco oaxaca,oferta de hoteles en huatulco,mejores hoteles huatulco,hoteleshuatulco,hoteles en bahia de huatulco,oaxaca huatulco hoteles,hoteles oaxaca huatulco,tarifas de hoteles en huatulco,hoteles en huatulco mexico,ofertas hoteles huatulco,hoteles huatulco ofertas,promociones hoteles huatulco,hoteles en oaxaca huatulco,huatulco mexico hoteles,hoteles de huatulco precios,hoteles a huatulco",
		description:"Enamorate de las playas de Huatulco, tenemos  el hotel que necesitas. Cotiza con nosotros tu hotel en Huatulco.",
		image:""
	},
	"/hoteles-en-mazatlan":{
		title:"Hoteles en Mazatlán",
		keywords:"hoteles en mazatlan todo incluido,hoteles economicos en mazatlan,hoteles baratos en mazatlan,hoteles todo incluido en mazatlan,hoteles mazatlan todo incluido,hoteles en mazatlan zona dorada,hoteles en mazatlan baratos,hoteles en mazatlan economicos,hoteles mazatlan zona dorada,hoteles todo incluido mazatlan,hoteles disponibles en mazatlan,mazatlan hoteles todo incluido,hoteles mazatlan sinaloa,hoteles zona dorada mazatlan,paquetes de hoteles en mazatlan,precios de hoteles en mazatlan,hoteles mazatlan baratos,hoteles baratos mazatlan,mejores hoteles en mazatlan,hoteles mazatlan economicos,mazatlan sinaloa hoteles,promociones de hoteles en mazatlan,hoteles economicos mazatlan,hoteles mazatlan promociones,hoteles 5 estrellas en mazatlan,mazatlan hoteles economicos,hoteles en zona dorada mazatlan,hoteles en mazatlan sinaloa economicos,hoteles en mazatlan 5 estrellas,ofertas de hoteles en mazatlan,hoteles en mazatlan con cocineta,hoteles economicos en mazatlan sinaloa,hoteles de mazatlan baratos,hoteles de mazatlan todo incluido,lista de hoteles en mazatlan,hoteles en mazatlan 3 estrellas,hoteles con cocineta en mazatlan,precio de hoteles en mazatlan,mazatlan hoteles baratos,telefonos de hoteles en mazatlan,promociones hoteles mazatlan,ofertas hoteles mazatlan,hoteles de mazatlan zona dorada,los mejores hoteles de mazatlan,hoteles 5 estrellas mazatlan,hoteles baratos en mazatlan sinaloa,tarifas de hoteles en mazatlan,hoteles en oferta en mazatlan,hoteles en mazatlan 4 estrellas,los mejores hoteles en mazatlan,hoteles de lujo en mazatlan,hoteles mazatlan todo incluido economicos,mejores hoteles de mazatlan,hoteles playa mazatlan,hoteles de mazatlan economicos,hoteles en mazatlan promociones,hoteles en mazatlan precios,hoteles en promocion en mazatlan,hoteles 3 estrellas en mazatlan,oferta de hoteles en mazatlan,hoteles 4 estrellas en mazatlan,imagenes de hoteles en mazatlan,paquetes hoteles mazatlan,precios hoteles mazatlan,hoteles en mazatlan sin,hoteles en mazatlan mexico,reservaciones de hoteles en mazatlan,tarifas hoteles mazatlan,todos los hoteles de mazatlan,promocion de hoteles en mazatlan,hotelesmazatlan,costos de hoteles en mazatlan,hoteles nuevos en mazatlan,hoteles mazatlan precios,fotos de hoteles en mazatlan,hoteles en mazatlan sinaloa mexico,directorio de hoteles en mazatlan,promociones en hoteles de mazatlan,ofertas hoteles en mazatlan,hoteles en mazatlan ofertas,hoteles enmazatlan,hoteles mazatlan 3 estrellas,mazatlan todo incluido hoteles,hoteles en mazatlan playa,oferta hoteles mazatlan,hoteles mazatlan sinaloa zona dorada,hotelesen mazatlan,guia de hoteles en mazatlan,hoteles en mazatlan centro,hoteles de mazatlan sinaloa economicos,hoteles mazatlan mexico,hoteles cerca de mazatlan",
		description:"Hoteles en Mazatlan. !No busques más! Entra y elige los mejores hoteles de Mazatlan con nusestro buscador en linea.",
		image:""
	},
	"/hoteles-en-monterrey":{
		title:"Hoteles en Monterrey",
		keywords:"hoteles en monterrey,hoteles monterrey,hoteles baratos en monterrey,hoteles de monterrey,monterrey hoteles,hoteles monterrey nuevo leon,hoteles en monterrey mexico,hoteles en nuevo leon monterrey,hoteles en monterrey nuevo león,ofertas hoteles monterrey,hoteles monterrey mexico,hoteles de monterrey nuevo leon,ofertas de hoteles en monterrey,hoteles cerca de monterrey,monterrey nuevo leon hoteles,hoteles en oferta en monterrey",
		description:"¿Visitas Monterrey? Tenemos una gran cantidad de opciones para elegir los mejores hoteles en Monterrey. !Entra y cotiza con nosotros!",
		image:""
	},
	"/hoteles-en-cuernavaca":{
		title:"Hoteles en Cuernavaca",
		keywords:"hoteles en cuernavaca,hoteles de cuernavaca,hoteles en cuernavaca economicos,hoteles baratos cuernavaca,los mejores hoteles de cuernavaca,hoteles cerca de cuernavaca,mejores hoteles de cuernavaca,hoteles de cuernavaca morelos",
		description:"Hoteles en Cuernavaca para disfrutar la cuidad de la eterna primavera. Encuentra tu hotel en Cuernavaca en nuestra sección.",
		image:""
	},
	"/hoteles-en-san-jose-del-cabo":{ 
		title:"Hoteles en San Jose del Cabo", 
		keywords:"hoteles en los cabos,hoteles los cabos,hoteles san jose del cabo, hoteles en cabo san lucas,hoteles los cabos san lucas,hoteles cabo san lucas,los cabos san lucas hoteles,cabo san lucas hoteles,hoteles en cabo,hoteles en los cabos bcs,hoteles en los cabos mexico,hoteles en cabos san lucas,hoteles cabos san lucas,hoteles de cabo san lucas,cabos san lucas hoteles,hoteles cabo,hoteles cabo san lucas economicos", 
		description:"Encuentra los mejores hoteles en San Jose del Cabo con Yo Planner, descubre las diferentes opciones con las mejores tarifas para cotizar los hoteles en San Jose del Cabo.", 
		image:"" 
	},
	"/hoteles-en-toluca":{ 
		title:"Hoteles en Toluca", 
		keywords:"hoteles en toluca,hoteles toluca,hoteles en el estado de mexico,toluca hoteles,hoteles en toluca estado de mexico,hoteles del estado de mexico,hoteles edo mex,viajes y hoteles,agencias de hoteles,hoteles en toluca edo de mexico,hoteles en toluca mexico,estado de mexico hoteles,hoteles de estado de mexico", 
		description:"¿Estas próximo a visitar Toluca? Tenemos los mejores hoteles para ti.", 
		image:"" 
	},
	"/hoteles-en-ixtapa":{  
		title:"Hoteles en Ixtapa", 
		keywords:"hoteles en ixtapa todo incluido,hoteles todo incluido en ixtapa,hoteles ixtapa todo incluido,hoteles en ixtapa,hoteles todo incluido ixtapa,hoteles economicos en ixtapa,ixtapa hoteles todo incluido,hoteles baratos en ixtapa,hoteles ixtapa,ixtapa hoteles,hoteles en ixtapa economicos,ofertas de hoteles en ixtapa,hoteles en ixtapa baratos,hoteles de ixtapa,precios de hoteles en ixtapa,hoteles en zihuatanejo,promociones de hoteles en ixtapa,hoteles en ixtapa zihuatanejo,hoteles de ixtapa todo incluido,hoteles baratos ixtapa,hoteles ixtapa zihuatanejo,ixtapa zihuatanejo hoteles,mapa de hoteles en ixtapa,hoteles en ixtapa 5 estrellas,zihuatanejo hoteles,hoteles de lujo en ixtapa,tarifas de hoteles en ixtapa,hoteles zihuatanejo,ofertas hoteles ixtapa,lista de hoteles en ixtapa,ixtapa hoteles economicos,mejores hoteles en ixtapa,hoteles ixtapa zihuatanejo todo incluido,ixtapa zihuatanejo hoteles todo incluido,hoteles en ixtapa guerrero,hoteles todo pagado en ixtapa,hoteles baratos en ixtapa zihuatanejo,hoteles en zihuatanejo economicos,hoteles ixtapa economicos,hoteles en zihuatanejo todo incluido,ixtapa zihuatanejo hoteles economicos,paquetes de hoteles en ixtapa,hoteles economicos en zihuatanejo,hoteles economicos en ixtapa zihuatanejo,los mejores hoteles de ixtapa,promociones en hoteles de ixtapa,promociones hoteles ixtapa,hoteles economicos ixtapa,hoteles en ixtapa zihuatanejo economicos,hoteles en ixtapa zihuatanejo baratos,hoteles emporio ixtapa,hoteles en iztapa,hoteles ixtapa baratos,hoteles de zihuatanejo,ixtapa hoteles baratos,mejores hoteles de ixtapa,los mejores hoteles en ixtapa,mejores hoteles ixtapa,hoteles en ixtapa promociones,hoteles 3 estrellas en ixtapa,oferta de hoteles en ixtapa,hoteles all inclusive ixtapa,hoteles en zihuatanejo con playa,mapa hoteles ixtapa,hoteles en troncones ixtapa,hoteles en ixtapa fontan,hoteles en oferta en ixtapa,hoteles iztapa,ixtapa hoteles 5 estrellas,agencias de hoteles,hoteles ixtapa zihuatanejo economicos,hoteles boutique en ixtapa,hoteles en ixtapa ziguatanejo,hoteles en ziguatanejo", 
		description:"Buscas hoteles en Ixtapa, cotiza con nostros solo los mejores hoteles para Ixtapa. Hoteles para tu próximo viaje a Ixtapa. Entra y cotiza las mejores opciones de hoteles en Ixtapa", 
		image:"" 
	},
	"/hoteles-en-pachuca":{ 
		title:"Hoteles en Pachuca", 
		keywords:"hoteles en Pachuca,hoteles Pachuca,Pachuca hoteles,hoteles economicos en Pachuca,paquetes vacacionales,hoteles en Pachuca todo incluido,hoteles baratos en Pachuca,hoteles en Pachuca economicos,hoteles de Pachuca,hotel en Pachuca,hoteles todo incluido en Pachuca,Pachuca todo incluido", 
		description:"¿Buscas hoteles en Pachuca?  Yo Planner tiene las mejores tarifas y promociones para visitar Pachuca, tenemos hoteles en todo Hidalgo. Entra y descubre nuestras vastas opciones.", 
		image:"" 
	},
	"/hoteles-en-guadalajara":{ 
		title:"Hoteles en Guadalajara", 
		keywords:"hoteles en guadalajara,hoteles guadalajara,hoteles baratos en guadalajara,hoteles economicos en guadalajara,hoteles de guadalajara,hoteles en guadalajara jalisco", 
		description:"Guadalajara goza de una excenlente infraestructura hotelera. Nostros tenemos los mejores hoteles en Guadalajara para ti !Entra y cotiza!", 
		image:"" 
	},
	"/hoteles-en-puerto-vallarta":{ 
		title:"Hoteles en Puerto Vallarta", 
		keywords:"hoteles en puerto vallarta,hoteles en nuevo vallarta,hoteles puerto vallarta,puerto vallarta hoteles,hoteles nuevo vallarta,nuevo vallarta hoteles,hoteles baratos en puerto vallarta,hoteles puerto vallarta todo incluido,hoteles economicos en puerto vallarta,hoteles de puerto vallarta,hoteles todo incluido puerto vallarta,hoteles nuevo vallarta todo incluido,puerto vallarta hoteles todo incluido,hoteles en puerto vallarta baratos,hoteles en puerto vallarta economicos,hoteles todo incluido nuevo vallarta,nuevo vallarta hoteles todo incluido,mejores hoteles en puerto vallarta,hoteles gay en puerto vallarta,hoteles de nuevo vallarta,hoteles baratos puerto vallarta,hoteles economicos puerto vallarta,hoteles puerto vallarta economicos,precios de hoteles en puerto vallarta,puerto vallarta hoteles economicos,hoteles en el centro de puerto vallarta,hoteles all inclusive puerto vallarta,los mejores hoteles de puerto vallarta,los mejores hoteles en puerto vallarta,lista de hoteles en puerto vallarta,puerto vallarta hoteles baratos,hoteles en puerto vallarta jalisco,hoteles puerto vallarta centro,mejores hoteles de puerto vallarta,promociones hoteles puerto vallarta,precio de hoteles en puerto vallarta,mejores hoteles puerto vallarta,puerto vallarta jalisco hoteles,hoteles puerto vallarta baratos,hoteles en puerto vallarta centro,hoteles familiares en puerto vallarta,hoteles puerto vallarta promociones,hoteles para bodas en puerto vallarta,hoteles de puerto vallarta economicos,hoteles en puerto vallarta mexico,hoteles centro puerto vallarta,hoteles en puerto vallarta precios,hoteles puerto vallarta zona romantica,hotelespuertovallarta,hoteles puerto vallarta 3 estrellas,hoteles en centro de puerto vallarta,precios hoteles puerto vallarta,hoteles a puerto vallarta,hoteles resort en puerto vallarta,puerto vallarta hoteles promociones,hoteles puerto vallarta jalisco,puerto vallarta mejores hoteles,hoteles en puerto vallarta para bodas,hoteles centro de puerto vallarta,hoteles en puerto vallarta en el centro,hoteles puerto vallarta mexico,precios de hoteles de puerto vallarta,precios de hoteles puerto vallarta,precios hoteles en puerto vallarta", 
		description:"Disfruta de los mejores Hoteles Resort en Puerto Vallarta, cotiza Hoteles en Puerto Vallarta con nosotros.", 
		image:"" 
	},
	"/hoteles-en-nuevo-vallarta":{ 
		title:"Hoteles en Nuevo Vallarta", 
		keywords:"hoteles en nuevo vallarta,hoteles nuevo vallarta,nuevo vallarta hoteles,hoteles nuevo vallarta todo incluido,nuevo vallarta hoteles todo incluido,hoteles todo incluido nuevo vallarta,hoteles de nuevo vallarta,hoteles en nuevo vallarta promociones,hoteles en nuevo vallarta 5 estrellas,hoteles en nuevo vallarta nayarit,hoteles economicos en nuevo vallarta,hoteles baratos en nuevo vallarta,hoteles en nuevo vallarta economicos,hoteles 5 estrellas en nuevo vallarta,mejores hoteles en nuevo vallarta,hoteles nuevo vallarta 5 estrellas,ofertas de hoteles en nuevo vallarta,hoteles nuevo vallarta promociones,hoteles en nuevo vallarta jalisco,nuevo vallarta hoteles 5 estrellas,hoteles nuevo vallarta nayarit,ofertas hoteles nuevo vallarta,los mejores hoteles de nuevo vallarta,hoteles en nuevo vallarta 4 estrellas,hoteles en nuevo puerto vallarta,los mejores hoteles en nuevo vallarta,hoteles baratos nuevo vallarta,oferta de hoteles en nuevo vallarta,hoteles 5 estrellas nuevo vallarta,hoteles en nuevo vallarta baratos,mejores hoteles de nuevo vallarta,mejores hoteles nuevo vallarta,nuevo vallarta hoteles baratos,precios de hoteles en nuevo vallarta,nuevo vallarta nayarit hoteles,hoteles de nuevo vallarta 5 estrellas,nuevo vallarta hoteles economicos,hoteles en nuevo vallarta marival,hoteles 4 estrellas en nuevo vallarta,nuevo puerto vallarta hoteles,hoteles nuevo vallarta baratos,hoteles familiares en nuevo vallarta,hoteles para bodas en nuevo vallarta,hoteles de 5 estrellas en nuevo vallarta,paquetes de hoteles en nuevo vallarta,mapa hoteles nuevo vallarta,hoteles mayan palace en nuevo vallarta,hoteles 4 estrellas nuevo vallarta,hoteles en nuevo vallarta mexico,hoteles en nuevo vallarte,hoteles nuevo puerto vallarta", 
		description:"Nuevo Vallarta es un paraiso para tus próximas vacaciones, nosotros tenemos los mejores hoteles en Nuevo Vallarta para ti. Entra a  nuestra seccion de hoteles en Nuevo Vallarta.", 
		image:"" 
	},
	"/hoteles-en-nuevo-vallarta":{ 
		title:"Hoteles en Nuevo Vallarta", 
		keywords:"hoteles en nuevo vallarta,hoteles nuevo vallarta,nuevo vallarta hoteles,hoteles nuevo vallarta todo incluido,nuevo vallarta hoteles todo incluido,hoteles todo incluido nuevo vallarta,hoteles de nuevo vallarta,hoteles en nuevo vallarta promociones,hoteles en nuevo vallarta 5 estrellas,hoteles en nuevo vallarta nayarit,hoteles economicos en nuevo vallarta,hoteles baratos en nuevo vallarta,hoteles en nuevo vallarta economicos,hoteles 5 estrellas en nuevo vallarta,mejores hoteles en nuevo vallarta,hoteles nuevo vallarta 5 estrellas,ofertas de hoteles en nuevo vallarta,hoteles nuevo vallarta promociones,hoteles en nuevo vallarta jalisco,nuevo vallarta hoteles 5 estrellas,hoteles nuevo vallarta nayarit,ofertas hoteles nuevo vallarta,los mejores hoteles de nuevo vallarta,hoteles en nuevo vallarta 4 estrellas,hoteles en nuevo puerto vallarta,los mejores hoteles en nuevo vallarta,hoteles baratos nuevo vallarta,oferta de hoteles en nuevo vallarta,hoteles 5 estrellas nuevo vallarta,hoteles en nuevo vallarta baratos,mejores hoteles de nuevo vallarta,mejores hoteles nuevo vallarta,nuevo vallarta hoteles baratos,precios de hoteles en nuevo vallarta,nuevo vallarta nayarit hoteles,hoteles de nuevo vallarta 5 estrellas,nuevo vallarta hoteles economicos,hoteles en nuevo vallarta marival,hoteles 4 estrellas en nuevo vallarta,nuevo puerto vallarta hoteles,hoteles nuevo vallarta baratos,hoteles familiares en nuevo vallarta,hoteles para bodas en nuevo vallarta,hoteles de 5 estrellas en nuevo vallarta,paquetes de hoteles en nuevo vallarta,mapa hoteles nuevo vallarta,hoteles mayan palace en nuevo vallarta,hoteles 4 estrellas nuevo vallarta,hoteles en nuevo vallarta mexico,hoteles en nuevo vallarte,hoteles nuevo puerto vallarta", 
		description:"Nuevo Vallarta es un paraiso para tus próximas vacaciones, nosotros tenemos los mejores hoteles en Nuevo Vallarta para ti. Entra a  nuestra seccion de hoteles en Nuevo Vallarta.", 
		image:"" 
	},
	"/hoteles-en-cabo-san-lucas-":{ 
		title:"Hoteles en Cabo San Lucas", 
		keywords:"hoteles en los cabos,hoteles los cabos,hoteles san jose del cabo, hoteles en cabo san lucas,hoteles los cabos san lucas,hoteles cabo san lucas,los cabos san lucas hoteles,cabo san lucas hoteles,hoteles en cabo,hoteles en los cabos bcs,hoteles en los cabos mexico,hoteles en cabos san lucas,hoteles cabos san lucas,hoteles de cabo san lucas,cabos san lucas hoteles,hoteles cabo,hoteles cabo san lucas economicos", 
		description:"Encuentra los mejores hoteles en Cabo San Lucas con Yo Planner, descubre las diferentes opciones con las mejores tarifas para cotizar los hoteles en Cabo San Lucas.", 
		image:"" 
	},
	"/hoteles-en-ciudad-de-mexico":{ 
		title:"Hoteles en Ciudad de Mexico", 
		keywords:"hoteles en Cuidad de Mexico todo incluido,Cuidad de Mexico hoteles,hoteles todo incluido en Cuidad de Mexico,hoteles en Cuidad de Mexico,hoteles Cuidad de Mexico todo incluido,Cuidad de Mexico hoteles todo incluido,hoteles economicos en Cuidad de Mexico,hoteles baratos en Cuidad de Mexico,hoteles de Cuidad de Mexico,hoteles todo incluido Cuidad de Mexico,hoteles en Cuidad de Mexico economicos,hoteles en Cuidad de Mexico baratos,hoteles Cuidad de Mexico colimahoteles en Cuidad de Mexico todo incluido,Cuidad de Mexico hoteles todo incluido ofertas,hoteles Cuidad de Mexico baratoshoteles todo incluido en Cuidad de Mexico,hoteles Cuidad de Mexico economicos,mejores hoteles en Cuidad de Mexico,promociones de hoteles en Cuidad de Mexico,hoteles baratos Cuidad de Mexico,hoteles Cuidad de Mexico colima todo incluido,hoteles economicos en Cuidad de Mexico,hoteles de Cuidad de Mexico todo incluido,hoteles 5 estrellas en Cuidad de Mexico,Cuidad de Mexico hoteles economicos,hoteles en santiago Cuidad de Mexico,precios de hoteles en Cuidad de Mexico,hoteles todo incluido en Cuidad de Mexico ofertas,hoteles economicos Cuidad de Mexico,hoteles Cuidad de Mexico todo incluido ofertas,hoteles todo incluido Cuidad de Mexico,paquetes de hoteles en Cuidad de Mexico,Cuidad de Mexico hoteles baratos", 
		description:"Encuentra los mejores hoteles en Ciudad de Mexico con Yo Planner, descubre las diferentes opciones con las mejores tarifas para cotizar los hoteles en Ciudad de Mexico.", 
		image:"" 
	},
	"/hoteles-en-manzanillo":{ 
		title:"Hoteles en Manzanillo", 
		keywords:"hoteles en manzanillo todo incluido,manzanillo hoteles,hoteles todo incluido en manzanillo,hoteles en manzanillo colima,hoteles manzanillo todo incluido,manzanillo hoteles todo incluido,hoteles economicos en manzanillo,hoteles baratos en manzanillo,hoteles de manzanillo,hoteles todo incluido manzanillo, hoteles en manzanillo economicos,hoteles en manzanillo baratos,hoteles manzanillo colima,hoteles en manzanillo colima todo incluido,manzanillo hoteles todo incluido ofertas,hoteles manzanillo baratos,hoteles todo incluido en manzanillo colima,hoteles manzanillo economicos,mejores hoteles en manzanillo,promociones de hoteles en manzanillo,hoteles baratos manzanillo,hoteles manzanillo colima todo incluido,hoteles economicos en manzanillo colima,hoteles de manzanillo todo incluido,hoteles 5 estrellas en manzanillo,manzanillo hoteles economicos,hoteles en santiago manzanillo,precios de hoteles en manzanillo,ofertas de hoteles en manzanillo,hoteles todo incluido en manzanillo ofertas,hoteles en mansanillo,hoteles economicos manzanillo,hoteles manzanillo todo incluido ofertas,hoteles todo incluido manzanillo colima,paquetes de hoteles en manzanillo,manzanillo hoteles baratos,hoteles en las brisas manzanillo,hoteles de manzanillo economicos,hoteles en manzanillo colima economicos,ofertas hoteles manzanillolos mejores hoteles de manzanillo,hoteles en mazanillo", 
		description:"Encuentra los mejores hoteles en Manzanillo con Yo Planner, descubre las diferentes opciones con las mejores tarifas para cotizar los hoteles en Manzanillo.", 
		image:"" 
	}
	
}
module.exports = {
	find:function(req,res){
		var path="/"+req.param('id');
		req.session.metas = _DESTINOS[path];
		console.log("path",path)
		res.redirect("/#"+path);
	} 
};