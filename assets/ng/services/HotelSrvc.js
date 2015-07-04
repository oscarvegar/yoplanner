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
			hotelIdMLC: 363032, // Marquis Los Cabos
			hotelIdPPC: 352782, // Paradisus Playa del Carmen
			hotelIdFPC: 681932, // Four points Cancun
			hotelIdPIDF: 290774 // Presidente Intercontinental DF
	};

	var CUSTOM_DESTINATIONS_REVIEW = {
		EMPTY: null, // {searchId: '', text: ''},
		DEFAULT: {searchId: '', text: 'Resultados Búsqueda'},
		ACA: {searchId: 'ACA', text: 'Hoteles en Acapulco'},
		CL1: {searchId: 'CL1', text: 'Hoteles en Los Cabos'},
		CUN: {searchId: 'CUN', text: 'Hoteles en Cancun'},
		CVJ: {searchId: 'CVJ', text: 'Hoteles en Cuernavaca'},
		CZM: {searchId: 'CZM', text: 'Hoteles en Cozumel'},
		GDL: {searchId: 'GDL', text: 'Hoteles en Guadalajara'},
		HUX: {searchId: 'HUX', text: 'Hoteles en Huatulco'},
		JGDSM: {searchId: 'JGDSM', text: 'Hoteles en Ixtapa'},
		MEX: {searchId: 'MEX', text: 'Hoteles en Ciudad de México'},
		MTY: {searchId: 'MTY', text: 'Hoteles en Monterrey'},
		MZT: {searchId: 'MZT', text: 'Hoteles en Mazatlán'},
		NV1: {searchId: 'NV1', text: 'Hoteles en Nuevo Vallarta'},
		PA0: {searchId: 'PA0', text: 'Hoteles en Pachuca'},
		PBC: {searchId: 'PBC', text: 'Hoteles en Puebla'},
		PCM: {searchId: 'PCM', text: 'Hoteles en Playa del Carmen'},
		PVR: {searchId: 'PVR', text: 'Hoteles en Puerto Vallarta'},
		QRO: {searchId: 'QRO', text: 'Hoteles en Queretaro'},
		RM0: {searchId: 'RM0', text: 'Hoteles en Riviera Maya'},
		SD6: {searchId: 'SD6', text: 'Hoteles en Los Cabos'},
		SJD: {searchId: 'SJD', text: 'Hoteles en Los Cabos'},
		TLC: {searchId: 'TLC', text: 'Hoteles en Toluca'},
		ZLO: {searchId: 'ZLO', text: 'Hoteles en Manzanillo'}
	};

	return {
		homepageHotels: function() {
			var popDestImgInf = new Array();	// Imagen-Informacion
			var popDestInfImg = new Array();	// Informacion-Imagen

			popDestImgInf.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelIdMLC));
			popDestImgInf.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelIdPPC));
			popDestInfImg.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelIdFPC));
			popDestInfImg.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelIdPIDF));

			return $q.all(popDestImgInf.concat(popDestInfImg));
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
				return CUSTOM_DESTINATIONS_REVIEW.EMPTY;
			}
		},
	};
});