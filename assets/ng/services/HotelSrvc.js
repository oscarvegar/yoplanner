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
			hotelMLC: {hotelId: 363032, destName: 'Cabo San Lucas, Baja California Sur, México'},	// Marquis Los Cabos
			hotelPPC: {hotelId: 352782, destName: 'Playa del Carmen, Quintana Roo, México'},	// Paradisus Playa del Carmen
			hotelFPC: {hotelId: 681932, destName: 'Cancún, Quintana Roo, México'},	// Four points Cancun
			hotelPIDF: {hotelId: 290774, destName: 'Ciudad de México, México D.F., México'}	// Presidente Intercontinental DF
	};

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
		SD6: {searchId: 'SD6', text: 'Hoteles en Los Cabos', imgBgAcronym: 'SD6'},
		SJD: {searchId: 'SJD', text: 'Hoteles en Los Cabos', imgBgAcronym: 'SJD'},
		TLC: {searchId: 'TLC', text: 'Hoteles en Toluca', imgBgAcronym: 'TLC'},
		ZLO: {searchId: 'ZLO', text: 'Hoteles en Manzanillo', imgBgAcronym: 'ZLO'}
	};

	return {
		homepageHotels: function() {
			var popDestImgInf = new Array();	// Imagen-Informacion
			var popDestInfImg = new Array();	// Informacion-Imagen

			popDestImgInf.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelMLC.hotelId));
			popDestImgInf.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelPPC.hotelId));
			popDestInfImg.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelFPC.hotelId));
			popDestInfImg.push($http.get("/recinto/findById/"+CONTRACTING_HOTELS.hotelPIDF.hotelId));

			return $q.all(popDestImgInf.concat(popDestInfImg));
		},
		getHomepageHotelComp: function(hotelId) {
			var hotelDeltinationName = '';
			for (var i in CONTRACTING_HOTELS) {
				if(CONTRACTING_HOTELS[i].hotelId == hotelId) {
					hotelDeltinationName = CONTRACTING_HOTELS[i].destName;
					break;
				}
			};

			return hotelDeltinationName;
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
	};
});