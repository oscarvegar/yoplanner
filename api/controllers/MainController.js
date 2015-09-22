/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var _SECCIONES = {
	"/quienes-somos":{ 
		title:"¿Quienes Somos?",
		description:"Yo Planner es una empresa mexicana especializada en la organización y planeación tanto de meetings y conferencias para empresas, como de viajes turísticos. Compuesta por influenciadores de todas las áreas del turismo y con una experiencia conjugada de más de 30 años, Yo Planner integra todos los servicios turísticos en una sola plataforma.",
		keywords:"ventas de viajes,operadoras de viajes,agente de viaje,empresas de viaje,agensias de viajes,agecia de viajes,operadora de viajes,operadores de viajes,paginas de viajes,compañia de viajes,agenci de viajes,gencias de viajes,servicios de viaje,servicios de viajes,ajencias de viaje,empresas de viajes turisticos,ajencia de viajes,pagina de viajes,compañias de viajes,empresas de viajes,ajencias de viajes,operadoras de viaje,paginas de viajes mexico,empresas de viajes de egresados,servicio de viajes especiales,agensia de viajes,empresas de viajes de turismo,empresas de viajes y turismo,empresas viajes y turismo,empresas viajes,empresas de viajes en mexico,paginas de viaje,cotización de viajes,compañías de viajes,servicios de viajes y turismo,agente de viajes y turismo,companias de viajes y turismo,cotizacion de viajes,venta de viajes,operadoras de viajes en mexico,operadores de viajes en mexico,páginas de viajes,agència de viatges"
	},
	"/meetings":{ 
		title:"Meeting Planner",
		description:"Si buscas organizar un evento corporativo en algún destino turístico te podemos ayudar. No importa el desino que tengas en mente y el número de asistentes, nosotros encontraremos la mejor solución al mejor precio para que tu evento sea un éxito.",
		keywords:"empresa de turismo,empresas de turismo en mexico,Empresas de servicios turisticos,Cotizador de viajes online,Precios de hoteles,,Cotizador de hoteles,agencias de viajes en méxico,agencia de viajes méxico,agencias de viajes df,agencia de viajes df,agencias de viajes,agencias de viajes internacionales,agencias de viaje,agencia de viajes,agencias de viajes en los cabos,agencia de viajes internacionales,agencias de viajes en guadalajara,nombres de agencias de viajes,agencias de viajes en merida,agencia de viajes guadalajara,agencias de viajes en monterrey,agencia de viajes en los cabos,que es una agencia de viajes,agencia de viajes los cabos,agencias de viajes mexico,agencia de viajes travel,agencia de viajes monterrey,agencia de viajes en mexico,agencia de viajes veracruz,agencias de vuelos,agencias de viajes los cabos,agencia de viaje,agencias de viajes monterrey,agencia de viajes puebla,agencias de viajes por internet,agencia de viajes queretaro,agencias de viajes en puebla,agencia de viajes en monterrey,agencias turisticas,agencia de viajes merida,tipos de agencias de viajes,agencia de vuelos,agencias de viajes a europa,nombre de agencias de viajes,agencia de viajes mayorista,agencias de viajes en morelia,agencia de viajes morelia,paginas de agencias de viajes,travel agencia de viajes,que es agencia de viajes,nombres para agencias de viajes,agencias de viajes minoristas,agencia de viajes en linea,agencia de viajes leon gto,agencia de viajes cd juarez,agencias de viajes mayoristas,que son las agencias de viajes,agencia de tours,agencia turística,agencias de vuelo,agencias de tours,agencias de viajes puebla,agencias de viajes nacionales,agencias de viajes merida,agencia viajes,funciones de una agencia de viajes,agencias de viajes online,agencia de viajes que es,agencias de viaje en mexico,agencia de viajes online,agencia de viajes nacionales,agencia de viajes para empresas,agencia de viajes mexico df,agencias de viaje mexico,agencias de viaje internacionales,agencias de viajes mexico df,agencia de viajes tours,agencias de viajes morelia,directorio de agencias de viajes,agencia de viajes operadora,una agencia de viajes,agencia de excursiones,agencia de viajes europa,agencias de viajes paquetes vacacionales,agencias de viajes acapulco,agencias de viaje en acapulco,agencia de viajes virtual,que es una agencias de viajes,viajes agencia,agencia de viajes turisticos,agencias de excursiones,agencias de viajes mexicanas,agencias de viajes travel,agencias de viajes que es,agencia de viajes paquetes,agencia de viages,agencia de viajes y turismo,agencias de viajes en,agencias de viaje online,las agencias de viajes,agencias de viajes paquetes,agencias de viajes virtuales,folletos de agencias de viajes,agencias viajes,agencias mayoristas,viajes agencias,agencia de viejes,agencias de viajes baratas,que es agencias de viajes,agencias de viaje acapulco,agencias de viajes turisticos,agencias de viages,agencia de viajes turismo,agencia d viajes,agencia de viajes nuevo mundo,agencia de viajes para cancun,que es un agencia de viajes,lista de agencias de viajes,agencias de viajes on line,agencia de viajes mayoristas,agencias mayoristas de viajes,agencias de viaje en puerto vallarta,agencias de vuelos internacionales,agencia de viajes internacional,agencias de viajes que son,agencia de viajes argentina,agencias de viaje mayoristas,agencia mayorista,funciones de agencia de viajes,agencias de viajes en colombia,nombre de agencia de viajes,agencias de hoteles,agencias de viajes para cancun,agencias de viajes operadoras,agencia de viajes usa,que son las agencias de viaje,agencia de viajes para acapulco,agencias de viejes,agencias de viajes usa,agencias de viajes para acapulco,agencia de viajes en,agencias de viajes en argentina,agencia de viajes colombia,agencias d viaje,agencias de viajes en usa,agencia viaje,agencias para viajes,servicio de agencia de viajes,agencias de viajes precios,agencia de viajes destinos,agencia de viajes funciones,que es una agencia de viaje,funciones de la agencia de viajes,empresa de agencia de viajes,agencias viaje,que son agencias de viajes,agencia d eviajes,precios de agencias de viajes,agencias de viajes a puerto vallarta,agencia de cruceros,empresa agencia de viajes,agencias de viajes argentina,acapulco agencia de viajes,todo sobre agencias de viajes,agencias de viajes en el estado de méxico,funciones de las agencias de viaje,agencias deviajes,que es la agencia de viajes,agencias dmc,agencias de vijes,agencias de viajes web,agencias de viajes colombia,agencias de viajes paquetes turisticos mexico,agencia de viajes on line,agencia de viajes peru,agencia de viajes precios,agenciasde viajes,viaje agencia,la agencia de viajes,es negocio una agencia de viajes,agencias de viajes en peru,agencia de viajes e,agencias de viajes tours,agencias de biajes,agencia de viajes hoteles,agencia de viajes web,agencias de viajes en venezuela,agencia de viajes en cabo san lucas,agencia de viajes cabo san lucas,agencias de viajes en cabo san lucas,agencias de turismo,agencias de viajes en españa,que ofrece una agencia de viajes,agencias de viajes españa,empresas de agencias de viajes,agencias de viajes wikipedia,agencia de viajes en brasil,agencia de viajes manzanillo,agencias de viajes en manzanillo,agencia de viajes en manzanillo,agencias de viajes manzanillo,agencias de viajes en veracruz,agencias de viajes en chihuahua,agencias de viajes en queretaro,agencias de viajes chihuahua,agencia de viajes chihuahua,agencias de viajes queretaro,agencias de viajes en cancun,agencias de viajes guadalajara,agencia de viajes cuernavaca,agencia de viajes xalapa,agencias de viajes en campeche,agencias de viajes en toluca,agencias de viajes en villahermosa,agencias de viajes en xalapa,agencias de eventos,agencias de viajes en linea,agencias de viajes en colima,servicios de una agencia de viajes,agencia de viajes en veracruz,agencias de viaje en chihuahua,agencia de viajes colima,agencias de vuelos nacionales,agencias de viaje en queretaro,agencias de viajes todo incluido,agencias de viajes paquetes turisticos todo incluido,agencia de viajes todo incluido,paquetes de agencias de viajes,agencia de viajes en colima,agencias de viaje en merida,servicios de agencias de viajes,agencia de viajes en torreon,agencia de vuelos nacionales,ofertas de agencias de viajes,agencias de viajes guadalajara jalisco,agencias de cruceros en mexico,agencias de viajes colima,agencia de vuelos internacionales,agencias de viajes paquetes todo incluido,servicios de las agencias de viajes,agencias de eventos sociales,servicios de agencia de viajes,agencias de organizacion de eventos,agencia de viajes servicios,agencia de viajes de mexico,paquetes agencia de viajes,agencia viajes paquetes todo incluido,agencia de viajes toluca,agencias de viajes en cuernavaca,agencias de viajes en mexico df,agencia de viajes en toluca,viajes méxico. agencia de viajes en ciudad de méxico,agencias de viajes en acapulco,agencia de viajes acapulco,agencia de viajes en acapulco,agencia de viajes a acapulco,agencias de viajes a acapulco,agencias de viajes en acapulco guerrero,agencia de viajes en acapulco guerrero,agencias en acapulco,agencia de viajes acapulco conexion,agencia acapulco,agencia de vacaciones,agencias de vacaciones,agencia de viajes ixtapa,agencia de viajes en ixtapa,agencias de viajes en ixtapa zihuatanejo,agencias de turismo en mexico,agencias de viajes internacionales en mexico,agenciasdeviajes,agencias de turismo mexico,agencias de incentivo,agencias de incentivos,agencias de turismo internacional,agencias de turismo rosario,agencia de turismo internacional,agencia de turismo no es,agencias de turismo es,agencia de turismo df,www agencias de turismo,agencias de viajesç,agencias de viaje internacional,agencia de turismo mexico,agencia viajes internacionales,agencia de turismo rosario,que es agencia de turismo,que es una agencia de turismo,agencia de viajes.es,agencia de turismos,agencia de viajes pachuca,agencias de viajes en pachuca,agencias de viajes pachuca,agencia de viajes en pachuca,agencias de viajes en pachuca hidalgo,agencias de viajes en pachuca hgo,agencia de viajes pachuca hidalgo,agencia de viajes en pachuca hidalgo,agencia viajes mexico,agencias de viajes en df,agencias de viajes en tepic,agencia de viajes en puebla,agencia de viajes oaxaca,agencias de viajes en aguascalientes,agencias de viajes en oaxaca,agencia de viajes en guadalajara,agencias de viajes en tijuana,trabajo en agencia de viajes,agencias de viaje df,agencias de viajes en durango,agencia de viajes en queretaro,las mejores agencias de viajes,mejores agencias de viajes en mexico,empleo agencia de viajes,empleos en agencias de viajes,agencias de viajes de mexico,mejores agencias de viajes,mejor agencia de viajes mexico,agencia de viajes aguascalientes,agencia de viajes zacatecas,trabajo agencia de viajes,agencia de viajes tijuana,agencias de viajes aguascalientes,vacantes en agencias de viajes,agencias de viajes en zapopan,agencia de empleos,agencia de viajes en df,empleo en agencia de viajes,agencias viajes mexico,empleos agencia de viajes,vacantes agencias de viajes,agencias de viajes zacatecas,trabajo en agencias de viajes,agencia de viajes en chihuahua,agencias de viajes en saltillo,agencia de viajes en oaxaca,agencia de viaje mexico,agencias de viajes en celaya,agencias de aviones,agencia de viajes mexicali,agencias de viajes toluca,agencias de viajes en torreon,agencia de viajes en aguascalientes,agencias de viajes en hidalgo,agencias de trabajo en mexico,agencia de trabajo,agencia de viajes en morelia,agencias de empleos,agencias de viajes en puerto vallarta,agencias de viajes online en mexico,agencias de viajes oaxaca,tripticos de agencias de viajes,agencia de viajes a europa,agencia de viajes en hidalgo,agencias de viajes en culiacan,bolsa de trabajo agencia de viajes,agencia de viajes por internet,agencia de aviones,agencias de viajes saltillo,empleos agencias de viajes,la mejor agencia de viajes,mejor agencia de viajes,agencia mayorista de viajes,agencias de viaje en puebla,requisitos para abrir una agencia de viajes,vacantes agencia de viajes,bolsa de trabajo en agencias de viajes,bojorquez agencia de viajes,agencias de viajes mexicali,agencias de viaje en guadalajara,agencias de viaje guadalajara,agencia viajes guadalajara,agencia de viajes de guadalajara,agencias de viajes en guadalajara jalisco,agencias de viajes de guadalajara,agencias de viajes en guadalajara promociones,agencia de viajes en guadalajara jalisco,agencia de viaje guadalajara,agencia de viajes guadalajara jalisco,agencias de viaje en guadalajara jal,agencias de trabajo en guadalajara,agencia de viaje en guadalajara,agencias de empleo en guadalajara,agencia de viajes guadalajara bocho,agencias en guadalajara,agencias viajes guadalajara,agencias de viajes guadalajara promociones,agencia de empleos en guadalajara,agencias de viajes en guadalajara centro,agencias guadalajara,agencia de viajes en guadalajara promociones,agencia de viajes guadalajara centro,agencias de empleo guadalajara,agencia de trabajo en guadalajara,agencias de empleos en guadalajara,agencia de empleo guadalajara,agencia guadalajara,agencias de trabajo guadalajara,agencias de viajes zapopan,agencia de viajes puerto vallarta,agencias de viajes en puerto vallarta jalisco,agencia de viajes en puerto vallarta,agencias de viajes puerto vallarta,agencia de viajes a puerto vallarta,agencias de autos en puerto vallarta,agencia turistica,agencias de viaje en toluca,agencias de viaje toluca,agencias de viajes en toluca y metepec,agencias de viajes toluca y metepec,agencia de viajes toluca metepec,agencia de viajes en toluca y metepec,agencias de empleo en toluca,bolsa de trabajo agencias de viajes,agencias turísticas,agencias de viajes en ecatepec,agencia de viajes bolsa de trabajo,agencias de viajes en satelite,bolsa de trabajo en agencia de viajes,agencia de viajes naucalpan,agencia de viajes metepec,agencias de viajes bolsa de trabajo,agencias turisticas en mexico,agencias de viajes en metepec,agencia de viajes en metepec,agencias de viajes paquetes turisticos internacionales,agencia de cruceros en mexico,tours agencia de viajes,agencias de viajes españolas,negocio de agencia de viajes,agencias de viaje y turismo,agencias de viajes y turismo,agencia viajes y turismo,agencia de viaje tours,todas las agencias de viajes,agencia de turismo salvador,agencia de turismo em salvador,agencia de turismo online,agencia tours,agencias de turismo argentina,trabajo en agencia de turismo,agencias de viajes de colombia,agencias de turismo df,que es una agencia de viajes y turismo,agencias de viajes de turismo,agencias de turismo en argentina,agencias de turismos,agencias turismo paquetes,agencias de viajes colombianas,agencias turismo,agencias de viaje colombia,agencias de viajes hoteles,agencia viajes turismo,que es una agencia turistica,agencias de viajes turismo,agencia de viajes de turismo,agencia turisticas,www agencia de turismo,agencia de turismo cvc,agencias viajes colombia,agencias de turismo en rosario,cvc agencia de turismo,agencias de turismo em salvador,agencias de turismo colombia,viajes y turismo agencias,agencias de paquetes turisticos,agencias viajes y turismo,agencias de viajes cuernavaca,agencia de viajes en cuernavaca,agencias de viaje en cuernavaca,agencia de viajes plaza cuernavaca,agencias de viaje en monterrey,promueve agencia de viajes monterrey,agencias de viaje monterrey,agencias de viajes en monterrey n.l,agencia viajes monterrey,agencia de viaje monterrey,agencias de viajes monterrey nuevo leon,agencia de viajes en monterrey nuevo leon,agencias viajes monterrey,agencia de viajes de monterrey,agencias de viajes en monterrey nuevo leon,agencia monterrey,agencias de viajes de monterrey,agencia de viajes monterrey nuevo leon,agencias en monterrey,agencias monterrey,agencia de viaje en monterrey,mejor agencia de viajes en monterrey,agencias publicidad monterrey,agencias de empleos en monterrey,agencia de viajes huatulco,agencias de viajes en huatulco,agencias de viajes paquetes turisticos,agencia de viajes bojorquez,agencias de viajes en el df,agencias de viajes df paquetes,agencia de viajes en cancun,agencias de viajes cancun,agencias de viaje puebla,agencias de viajes veracruz,agencia de viajes en el df,agencia viajes puebla,agencias de viajes en puebla pue,agencias de viajes de puebla,agencias en puebla,agencia de viaje puebla,agencia de viajes atenas puebla,agencias de trabajo en puebla,agencias de empleo en puebla,agencia de viajes flosan de puebla,agencias puebla,agencia de viajes en celaya,agencia de viajes excel,agencias de empleo puebla,agencia de viajes turismo palenque,agencia de trabajo en puebla,excel agencia de viajes,agencia puebla,agencia de viajes excel tours,que hace una agencia de viajes,personal de una agencia de viajes,agencias de colocacion en puebla,historia de las agencias de viaje,telefonos de agencias de viajes,agencias de viajes tour operadoras,agencia de viajes tour operadora,agencia de viajes empleo,empleo en agencias de viajes,paquetes de agencia de viajes,perfil de una agencia de viajes,personal de agencia de viajes,empleos en agencia de viajes,telefono de agencias de viajes,puestos de trabajo en una agencia de viajes,organizacion de las agencias de viajes,agencias de viajes empleos,agencia tour operadora,agencias de viajes peru,agencias de viaje peru,que son agencia de viajes,que son agencias de viaje,que son las agencia de viajes,agencias de viajes la plata,agencia de viajes la plata,nueva agencia de viajes,agencias de viajes para empresas,agencias de viajes empleo,que es agencia de viaje,empleo agencias de viajes,agencias de viajes pereira,www.agencias de empleo,agencia de viajes falabella,agencias de viajes especiales,ofertas de empleo en agencias de viajes,empleados de agencias de viajes,ofertas de empleo agencias de viajes,agencias de viajes en querétaro,agencias de viaje queretaro,agencia viajes queretaro,agencias de viajes en queretaro qro,servicios de agencias de viajes queretaro,agencia de viaje queretaro,agencias en queretaro,agencias de empleo en queretaro,agencias de trabajo en queretaro,agencias de viajes en cozumel,agencia de viajes cancun,agencias de viajes en playa del carmen,agencia de viajes a cancun,agencias de viajes a cancun,agencias de viaje en cancun,agencias de viajes playa del carmen,agencias de viaje cancun,agencia viajes cancun,cancun agencia de viajes,agencias de tours en cancun,agencias de viaje a cancun,agencia de viaje cancun,agencias de turismo en cancun,agencia de turismo cancun,agencia de turismo em cancun,agencias de turismo en venezuela,directorio agencias viajes cancun,agencia de viajes en cancun quintana roo,asociación mexicana de agencias de viajes,agencias en cancun,asociacion mexicana de agencia de viajes,a que se dedica una agencia de viajes,agencias de viaje mexicanas,agencia turismo cancun,trabajar en una agencia de viajes,como trabajar en una agencia de viajes,en una agencia de viajes,agencias vacacionales,agencia de viajes en playa del carmen,agencia de viajes playa del carmen,agencias de viaje en playa del carmen,agencias de tours en playa del carmen,agencias de viajes en playa del carmen riviera maya,agencia de viajes riviera maya,agencias de viajes riviera maya,agencia de viajes mazatlan,agencias de viajes en mazatlan,agencia de viajes en mazatlan,agencias de viaje en mazatlan,agencias de viajes mazatlan,agencias de viajes en mazatlan sinaloa,agencias de viaje en veracruz,agencias de viaje veracruz,agencia viajes veracruz,agencia de viajes maruca veracruz,agencia veracruz,agencia de viajes en merida,agencia de viajes merida yucatán,agencias de viaje merida,agencias de viajes merida yucatan,agencias de viaje merida yucatan,agencia viajes merida,agencias de viajes en merida yucatan mexico,agencia de viajes pachon merida,agencia de viaje merida,agencia de viajes en merida yuc,agencias de viajes de merida,agencias viajes merida,agencias de tours en merida,agencias de viajes en yucatan,agencias en merida,agencia de viajes cuba,agencia de viajes para europa,agencias de viaje a europa,agencias de viajes para europa,agencias de viajes europa,agencias de viaje a cuba,agencias de viajes en europa,agencia de viaje travel,agencias de viaje en oaxaca,agencias de viaje oaxaca,agencias d viajes,agencia de viajes al mundo,agencias de viajes cuba,informacion de agencias de viajes,travel agencia,agencias de viaje por internet,agencia de viajes en europa,agencia viajes europa,agencias de viajes en cuba,agencia viajes travel,agencias travel,agencias de viaje travel,agencias de viajes en el mundo,directorio agencias de viajes,travel agencias de viajes,agencias de viaje en europa,servicios agencia de viajes,agencia de viajes en colombia,agencia de viaje en merida,natoura agencia de viajes merida,agencias de viajes merida promociones,agencias de turismo en merida"
		

	},
	"/agencia-de-viajes":{ 
		title:"Agencia de Viajes",
		description:"Yo Planner lo hace todo por ti! Como Agencia de Viajes en México atendemos todas tus necesidades en viajes, encuentra todo en una solo lugar, somos la agencia de viajes con más de 30 planners expertos que trabajan para darte los mejores precios y los servicios de la mas alta calidad."
	}
}

module.exports = {

	root:function(req,res){
		res.view('homepage')
	},
	redirect:function(req,res){	
		
		var path=req.route.path;
		if(path==="/"){
			console.log("PATH")
			res.view('homepage')
		}else{
			res.locals.metas=_SECCIONES[path];
			res.locals.path=path;
			req.session.metas = _SECCIONES[path]; 
			res.view("empty",{layout:"infoLayout"})
		}
	}
	
};

