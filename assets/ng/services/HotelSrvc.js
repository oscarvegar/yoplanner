/*
 *
 */
'use strict';

var HotelModule = angular.module('yoPlannerApp.hotel');

HotelModule.factory('HotelSrvc', function($http, $q) {


	// /hotel/SD6/detail/363032 - Marquis Los Cabos
	// /hotel/PCM/detail/352782 - Paradisus Playa del Carmen
	// /hotel/CUN/detail/681932 - Four points Cancun
	// /hotel/MEX/detail/290774 - Presidente Intercontinental DF
	// /hotel/MEX/detail/816287 - Presidente InterContinental Santa Fe DF
	var CONTRACTING_HOTELS = {
		hotelMLC: {hotelId: 276089, destName: 'Cabo San Lucas, Baja California Sur, México', fotoPrincipal: 'http://media.staticontent.com/media/pictures/5957a8d2-5169-45ca-b31e-61fff5a11e42'},	// Marquis Los Cabos
		hotelPPC: {hotelId: 352782, destName: 'Playa del Carmen, Quintana Roo, México', fotoPrincipal: 'img/hoteles/352782/Paradisus_La_Perla_Alberca_copia_popdest.jpg'},	// Paradisus Playa del Carmen
		hotelFPC: {hotelId: 681932, destName: 'Cancún, Quintana Roo, México', fotoPrincipal: 'img/hoteles/681932/four_points_cancun_popdest.jpg'},	// Four points Cancun
		hotelPIDF: {hotelId: 290774, destName: 'Ciudad de México, México D.F., México', fotoPrincipal: 'img/hoteles/290774/Presidente_InterContinental_Mexico_City_popdest.jpg'}	// Presidente Intercontinental DF
	};
	var CONTRACTING_HOTELS_ARRY = [
		{hotelId: 276089, destName: 'Cabo San Lucas, Baja California Sur, México', fotoPrincipal: 'http://media.staticontent.com/media/pictures/5957a8d2-5169-45ca-b31e-61fff5a11e42'},	// Marquis Los Cabos
		{hotelId: 352782, destName: 'Playa del Carmen, Quintana Roo, México', fotoPrincipal: 'img/hoteles/352782/Paradisus_La_Perla_Alberca_copia_popdest.jpg'},	// Paradisus Playa del Carmen
		{hotelId: 681932, destName: 'Cancún, Quintana Roo, México', fotoPrincipal: 'img/hoteles/681932/four_points_cancun_popdest.jpg'},	// Four points Cancun
		{hotelId: 290774, destName: 'Ciudad de México, México D.F., México', fotoPrincipal: 'img/hoteles/290774/Presidente_InterContinental_Mexico_City_popdest.jpg'}	// Presidente Intercontinental DF
	];

	var POPULAR_DESTINATIONS_ARRY = [
		{searchId: 'SD6', name: 'Cabo San Lucas', imgSrc: 'img/yp-backgrounds/SJD/Hoteles En Los Cabos.jpg', destName: 'Cabo San Lucas, Baja California Sur, México', description: 'Es una delegación del municipio de Los Cabos, Baja California Sur. Forma parte del corredor turistico de 33 km de belleza y paisajes únicos. Entre sus principales atracciones se encuentra el poder observar ballenas grises.', starRatingRange: new Array(5)},
		{searchId: 'PCM', name: 'Playa del Carmen', imgSrc: 'img/yp-backgrounds/PCM/Hoteles En Playa Del Carmen.jpg', destName: 'Playa del Carmen, Quintana Roo, México', description: 'Es la cabecera del municipio de Solidaridad en Quintana Roo, es parte de la Riviera Maya. Se pueden practicar numerosos deportes acuáticos o visitar la Quinta Avenida, su calle más famosa. Se pueden realizar eventos empresariales en el Fairmont Mayakoba.', starRatingRange: new Array(5)},
		{searchId: 'CUN', name: 'Cancun', imgSrc: 'img/yp-backgrounds/CUN/Hoteles en Cancun.jpg', destName: 'Cancún, Quintana Roo, México', description: 'Es la ciudad más poblada de Quintana Roo, y está certificada por la Organización Mundial de Turismo como una ciudad con desarrollo turístico de nivel internacional. Cuenta con hermosas playas, la Laguna Nichupté, el Museo Arqueológico y varios parques turísticos, el más famoso es Xcaret. Cuenta con el Canún Center Conventions and Exhibitions.', starRatingRange: new Array(5)},
		{searchId: 'MEX', name: 'Ciudad de México', imgSrc: 'img/yp-backgrounds/MEX/Hoteles Ciudad de Mexico.jpg', destName: 'Ciudad de México, México D.F., México', description: 'La capital de México tiene mucho que ofrecer tanto para turismo como para eventos empresariales. Llamada la ciudad de los museos, el Distrito Federal es una capital cultural y de atractivo turístico; además de contar con muchos centros de congresos y convenciones.', starRatingRange: new Array(5)}
	];

	var CUSTOM_DESTINATIONS_REVIEW = {
		EMPTY: null, // {searchId: '', text: ''},
		DEFAULT: {searchId: '', text: 'Resultados Búsqueda', imgBgAcronym: '02'},
		ACA: {searchId: 'ACA', text: 'Hoteles en Acapulco', imgBgAcronym: 'ACA'},
		CL1: {searchId: 'CL1', text: 'Hoteles en Los Cabos', imgBgAcronym: 'CL1'},
		CUN: {searchId: 'CUN', text: 'Hoteles en Cancun', imgBgAcronym: 'CUN'},
		CVJ: {searchId: 'CVJ', text: 'Hoteles en Cuernavaca', imgBgAcronym: 'CVJ'},
		CZM: {searchId: 'CZM', text: 'Hoteles en Cozumel', imgBgAcronym: 'CZM'},
		GDL: {searchId: 'GDL', text: 'Hoteles en Guadalajara', imgBgAcronym: 'GDL'},
		HUX: {searchId: 'HUX', text: 'Hoteles en Huatulco', imgBgAcronym: 'HUX'},
		JGDSM: {searchId: 'JGDSM', text: 'Hoteles en Ixtapa', imgBgAcronym: 'JGDSM'},
		MEX: {searchId: 'MEX', text: 'Hoteles en Ciudad de México', imgBgAcronym: 'MEX'},
		MTY: {searchId: 'MTY', text: 'Hoteles en Monterrey', imgBgAcronym: 'MTY'},
		MZT: {searchId: 'MZT', text: 'Hoteles en Mazatlán', imgBgAcronym: 'MZT'},
		NV1: {searchId: 'NV1', text: 'Hoteles en Nuevo Vallarta', imgBgAcronym: 'NV1'},
		PA0: {searchId: 'PA0', text: 'Hoteles en Pachuca', imgBgAcronym: 'PA0'},
		PBC: {searchId: 'PBC', text: 'Hoteles en Puebla', imgBgAcronym: 'PBC'},
		PCM: {searchId: 'PCM', text: 'Hoteles en Playa del Carmen', imgBgAcronym: 'PCM'},
		PVR: {searchId: 'PVR', text: 'Hoteles en Puerto Vallarta', imgBgAcronym: 'PVR'},
		QRO: {searchId: 'QRO', text: 'Hoteles en Queretaro', imgBgAcronym: 'QRO'},
		RM0: {searchId: 'RM0', text: 'Hoteles en Riviera Maya', imgBgAcronym: 'RM0'},
		SD6: {searchId: 'SD6', text: 'Hoteles en Cabo San Lucas', imgBgAcronym: 'SD6'},
		SJD: {searchId: 'SJD', text: 'Hoteles en San José del Cabo', imgBgAcronym: 'SJD'},
		TLC: {searchId: 'TLC', text: 'Hoteles en Toluca', imgBgAcronym: 'TLC'},
		ZLO: {searchId: 'ZLO', text: 'Hoteles en Manzanillo', imgBgAcronym: 'ZLO'}
	};
	var CUSTOM_DESTINATIONS_REVIEW_ARRY = [
		{},	// EMPTY: null, // {searchId: '', text: ''},
		{searchId: 'DEFAULT', text: 'Resultados Búsqueda', imgBgAcronym: '02'},
		{searchId: 'ACA', text: 'Hoteles en Acapulco', imgBgAcronym: 'ACA'},
		{searchId: 'CL1', text: 'Hoteles en Los Cabos', imgBgAcronym: 'CL1'},
		{searchId: 'CUN', text: 'Hoteles en Cancun', imgBgAcronym: 'CUN'},
		{searchId: 'CVJ', text: 'Hoteles en Cuernavaca', imgBgAcronym: 'CVJ'},
		{searchId: 'CZM', text: 'Hoteles en Cozumel', imgBgAcronym: 'CZM'},
		{searchId: 'GDL', text: 'Hoteles en Guadalajara', imgBgAcronym: 'GDL'},
		{searchId: 'HUX', text: 'Hoteles en Huatulco', imgBgAcronym: 'HUX'},
		{searchId: 'JGDSM', text: 'Hoteles en Ixtapa', imgBgAcronym: 'JGDSM'},
		{searchId: 'MEX', text: 'Hoteles en Ciudad de México', imgBgAcronym: 'MEX'},
		{searchId: 'MTY', text: 'Hoteles en Monterrey', imgBgAcronym: 'MTY'},
		{searchId: 'MZT', text: 'Hoteles en Mazatlán', imgBgAcronym: 'MZT'},
		{searchId: 'NV1', text: 'Hoteles en Nuevo Vallarta', imgBgAcronym: 'NV1'},
		{searchId: 'PA0', text: 'Hoteles en Pachuca', imgBgAcronym: 'PA0'},
		{searchId: 'PBC', text: 'Hoteles en Puebla', imgBgAcronym: 'PBC'},
		{searchId: 'PCM', text: 'Hoteles en Playa del Carmen', imgBgAcronym: 'PCM'},
		{searchId: 'PVR', text: 'Hoteles en Puerto Vallarta', imgBgAcronym: 'PVR'},
		{searchId: 'QRO', text: 'Hoteles en Queretaro', imgBgAcronym: 'QRO'},
		{searchId: 'RM0', text: 'Hoteles en Riviera Maya', imgBgAcronym: 'RM0'},
		{searchId: 'SD6', text: 'Hoteles en Cabo San Lucas', imgBgAcronym: 'SD6'},
		{searchId: 'SJD', text: 'Hoteles en San José del Cabo', imgBgAcronym: 'SJD'},
		{searchId: 'TLC', text: 'Hoteles en Toluca', imgBgAcronym: 'TLC'},
		{searchId: 'ZLO', text: 'Hoteles en Manzanillo', imgBgAcronym: 'ZLO'}
	];

	var HOMEPAGE_TESTIMONIALS = [
		{
			searchId: null,
			hotelId: null,
			comments: {
				description: 'Thompson Playa del Carmen. Un hotel Sexy y vanguardista para todos aquellos que realmente buscan un inolvidable estilo de vida!'
			},
			user: {
				name: 'Sergio Álvarez',
				job: 'DOS México & LATAM',
				profilePhoto: 'img/testimonials/IMG_2849_tstmnl_314px.JPG'
			}
		},
		{
			searchId: null,
			hotelId: null,
			comments: {
				description: 'Paradisus Playa del Carmen La Perla y La Esmeralda. Nosotros lo llamamos LUXExclusive, usted lo llamará auténtica libertad.'
			},
			user: {
				name: 'Marco Páramo',
				job: 'Director de Ventas',
				profilePhoto: 'img/testimonials/Marco_Paramo_tstmnl_314px.jpg'
			}
		}
	];

	var LOCATION_BANNER_ADS = [
		{
			searchId: 'DEFAULT',
			bannerTxt: 'Con Yo Planner obtén la mejor asesoría gratuita para la adquisición de hoteles, cruceros, grupos y convenciones. Blog de Viajes, RFP y reservaciones en línea.',
			bannerAdImg: 'img/HotelesYoPlanner.jpg',
			bannerUrl: '#'
		}
		/*
		,{
			searchId: 'CUN',
			bannerTxt: '123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 123456789 1234657891',
			bannerAdImg: 'img/hoteles/681932/four_points_cancun_popdest.jpg',
			bannerUrl: '#/hotel/CUN/detail/681932'
		}
		*/
	];

	return {
		homepageDestinations: function() {
			return POPULAR_DESTINATIONS_ARRY;
		},
		homepageHotelsOld: function() {
			var popDestImgInf = new Array();	// Imagen-Informacion
			var popDestInfImg = new Array();	// Informacion-Imagen

			popDestImgInf.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelMLC.hotelId));
			popDestImgInf.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelPPC.hotelId));
			popDestInfImg.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelFPC.hotelId));
			popDestInfImg.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelPIDF.hotelId));

			return $q.all(popDestImgInf.concat(popDestInfImg));
		},
		homepageHotels: function() {
			var popHotelsMex = new Array();

			for (var i = 0; i < CONTRACTING_HOTELS_ARRY.length; i++) {
				popHotelsMex.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS_ARRY[i].hotelId));
			};

			return $q.all(popHotelsMex);
		},
		getHomepageHotelComp: function(hotelId) {
			var hotelDestinationName = '';
			for (var i in CONTRACTING_HOTELS) {
				if(CONTRACTING_HOTELS[i].hotelId == hotelId) {
					hotelDestinationName = CONTRACTING_HOTELS[i].destName;
					break;
				}
			};

			return hotelDestinationName;
		},
		getHomepageHotelMainPhoto: function(hotelId) {
			var hotelMainPhoto = '';
			for (var i in CONTRACTING_HOTELS) {
				if(CONTRACTING_HOTELS[i].hotelId == hotelId) {
					hotelMainPhoto = CONTRACTING_HOTELS[i].fotoPrincipal;
					break;
				}
			};

			return hotelMainPhoto;
		},
		getHomepageTestimonials: function() {
			return HOMEPAGE_TESTIMONIALS;
		},
		getHomepageHotelsReviewed: function() {
			var CUSTOM_DESTINATIONS_REVIEW_tmp = {};
			angular.copy(CUSTOM_DESTINATIONS_REVIEW, CUSTOM_DESTINATIONS_REVIEW_tmp);
			delete CUSTOM_DESTINATIONS_REVIEW_tmp.EMPTY;
			delete CUSTOM_DESTINATIONS_REVIEW_tmp.DEFAULT;
			return CUSTOM_DESTINATIONS_REVIEW_tmp;
		},
		validateDestination: function(searchId) {
			if(CUSTOM_DESTINATIONS_REVIEW[searchId]) {
				return CUSTOM_DESTINATIONS_REVIEW[searchId];
			} else {
				/*
				var DEFAULT = CUSTOM_DESTINATIONS_REVIEW.DEFAULT;
				DEFAULT.searchId = searchId;
				return DEFAULT;
				*/
				// return CUSTOM_DESTINATIONS_REVIEW.DEFAULT;
				return CUSTOM_DESTINATIONS_REVIEW.EMPTY;
			}
		},
		getDestReviewComp: function(searchId) {
			if(CUSTOM_DESTINATIONS_REVIEW[searchId]) {
				return CUSTOM_DESTINATIONS_REVIEW[searchId];
			} else {
				
				var DEFAULT = CUSTOM_DESTINATIONS_REVIEW.DEFAULT;
				DEFAULT.searchId = searchId;
				return DEFAULT;
				
				// return CUSTOM_DESTINATIONS_REVIEW.DEFAULT;
				// return CUSTOM_DESTINATIONS_REVIEW.EMPTY;
			}
		},
		getLocationBannerAd: function(searchId) {
			var tmpLocBanAd = {}
			for (var i = 0; i < LOCATION_BANNER_ADS.length; i++) {
				if(LOCATION_BANNER_ADS[i].searchId === 'DEFAULT') {
					tmpLocBanAd = LOCATION_BANNER_ADS[i];
					continue;
				}

				if(LOCATION_BANNER_ADS[i].searchId === searchId) {
					tmpLocBanAd = LOCATION_BANNER_ADS[i];
					break;
				}
			};
			return tmpLocBanAd;
		}
	};
});