var server = "";

//server = "http://localhost:1337";
angular.module('yoPlannerApp', ['autocomplete','angular-flexslider','yp-index','yp-hoteles','yp-rfp','cgNotify','ngCookies'])

.controller('RecintosController', ["$scope","$http","$sce","$filter","notify","$cookieStore","$timeout",function($scope,$http,$sce,$filter,notify,$cookieStore,$timeout) {
    $scope.divideTipoHabitaciones = function(tipo,arre){
    	var res = [];
    	for(i in arre){
    		if(arre[i].tipoHabitacion==tipo)
    			res.push(arre[i]);
    	}
    	return res;
    }
    $scope.showSearch = true;
    $scope.hideResults = false;
    $scope.showDetail = false;
    $scope.searchString = null;
    $scope.searchId = null;
    $scope.lastSearchId = null;
    $scope.currentHotel = null;
    $scope.currentHotelMap = null;
    $scope.hotelesSeleccionados = window.localStorage.hotelesSeleccionados!=null?JSON.parse(window.localStorage.hotelesSeleccionados):[];
    $scope.showLoader = false;
    $scope.rfp =  window.localStorage.rfp!=null?JSON.parse(window.localStorage.rfp):{};
    $scope.configuracionHabitacionesDobles = $scope.rfp.configuracionHabitaciones!=null?$scope.divideTipoHabitaciones(2,$scope.rfp.configuracionHabitaciones):[];
    $scope.configuracionHabitacionesSencillas = $scope.rfp.configuracionHabitaciones!=null?$scope.divideTipoHabitaciones(1,$scope.rfp.configuracionHabitaciones):[];
    $scope.fechaInicialFor = $scope.rfp.fechaInicial!=null?moment($scope.rfp.fechaInicial).format('DD-MM-YYYY'):null;
    $scope.fechaFinalFor = $scope.rfp.fechaFinal!=null?moment($scope.rfp.fechaFinal).format('DD-MM-YYYY'):null;
    if($scope.rfp.fechaInicial!=null){
    	$scope.rfp.fechaInicial = parseDate($scope.fechaInicialFor);
    	$scope.rfp.fechaFinal = parseDate($scope.fechaFinalFor);
    }
    $scope.folioFinal = null;
    $scope.showIndex = true;
    $scope.showMostrarMas = false;
    $scope.searchClass = "buscadorIni";
    $scope.footerClass = "footerIni";
    if($scope.rfp.salones){
    	for(var i in $scope.rfp.salones)
    		$timeout(function(){$scope.refrescarSalones(i)}, 3000);
    }

    var urlParams = {}
	location.search.substr(1).split("&").forEach(function(item) {urlParams[item.split("=")[0]] = item.split("=")[1]})
    if(urlParams.hid!=null){
    	$http.get(server+"/recinto/findById/"+urlParams.hid).success(function(data){
    		console.log(data);
    		$scope.currentHotel = data.hotels[0];
    		$scope.selectResult($scope.currentHotel);
    	});
    }
    /*
    $scope.rfp.paisText = "México";
    $scope.rfp.nombreCliente = "oscar";
    $scope.rfp.email = "osc@fo.com";
    $scope.rfp.telefonoContacto = "5544556677";*/
    $scope.currentPage = 0;
    console.log($scope.rfp);
    $scope.search = function() {
        if($scope.searchId==null)return;
        $scope.showLoader = true;
       // $scope.searchId = $scope.searchString.split(" ")[0];
        $http.get(server+"/recinto/findByCiudadId/"+$scope.searchId).success(function (data){
            console.log(data);
            $scope.hotels = data.hotels;
            $scope.showIndex = false;
            $scope.showSearch = false;
            $scope.hideResults = true;
            $scope.showDetail = false;
            $scope.showLoader = false;
            $scope.currentPage=1;
            $scope.lastSearchId = $scope.searchId==null?$scope.lastSearchId:$scope.searchId;
            $scope.searchId = null;
            $scope.searchClass = "buscadorRes";
    		$scope.footerClass = "footerRes";
            document.getElementById("buscadorbox").scrollIntoView();
        }).error(function (err){
            console.log(err);
            $scope.showLoader = false;
        });

    };
    
    $scope.masResultados = function(){
         $scope.showMostrarMas = true;
        $http.get(server+"/recinto/findByCiudadId/"+$scope.lastSearchId+"?p="+$scope.currentPage).success(function (data){
             $scope.showMostrarMas = false;
            console.log(data);
            $scope.hotels = $scope.hotels.concat(data.hotels);
            $scope.currentPage++;
            
        }).error(function (err){
            console.log(err);
            $scope.showLoader = false;
        });
        
    };
    $scope.showResults = function() {
        $scope.showSearch = false;
        $scope.hideResults = true;
        $scope.showDetail = false;
        document.getElementById("buscadorbox").scrollIntoView();

    };


    $scope.selectResult = function(hotel) {
		$scope.currentHotel = hotel;
		$scope.showIndex = false;
        $scope.showSearch = false;
        $scope.hideResults = true;
        $scope.showDetail = false;
        $scope.showLoader = false;
        $scope.searchClass = "buscadorRes";
		$scope.footerClass = "footerRes";
		// try {
			// $('#carousel').flexslider('destroy');
			// $('#slider').flexslider('destroy');
			
		// } catch(e) {}
		
		// $('#carousel').flexslider({
			// animation: "slide",
			// controlNav: false,
			// animationLoop: false,
			// slideshow: false,
			// itemWidth: 210,
			// itemMargin: 5,
			// asNavFor: '#slider'
		// });

		// $('#slider').flexslider({
			// animation: "slide",
			// controlNav: false,
			// animationLoop: false,
			// slideshow: false,
			// sync: "#carousel"
		// });
		
		window.setTimeout(function() {
			  
			//set your google maps parameters
			var latitude = $scope.currentHotel.geoLocation.latitude,
				longitude = $scope.currentHotel.geoLocation.longitude,
				map_zoom = 14;

			//google map custom marker icon - .png fallback for IE11
			var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
			var marker_url = ( is_internetExplorer11 ) ? 'img/cd-icon-location.png' : 'img/cd-icon-location.svg';
				
			//define the basic color of your map, plus a value for saturation and brightness
			var	main_color = '#2d313f',
				saturation_value= -20,
				brightness_value= 5;

			//we define here the style of the map
			var style= [ 
				{
					//set saturation for the labels on the map
					elementType: "labels",
					stylers: [
						{saturation: saturation_value}
					]
				},  
				{	//poi stands for point of interest - don't show these lables on the map 
					featureType: "poi",
					elementType: "labels",
					stylers: [
						{visibility: "off"}
					]
				},
				{
					//don't show highways lables on the map
					featureType: 'road.highway',
					elementType: 'labels',
					stylers: [
						{visibility: "off"}
					]
				}, 
				{ 	
					//don't show local road lables on the map
					featureType: "road.local", 
					elementType: "labels.icon", 
					stylers: [
						{visibility: "off"} 
					] 
				},
				{ 
					//don't show arterial road lables on the map
					featureType: "road.arterial", 
					elementType: "labels.icon", 
					stylers: [
						{visibility: "off"}
					] 
				},
				{
					//don't show road lables on the map
					featureType: "road",
					elementType: "geometry.stroke",
					stylers: [
						{visibility: "off"}
					]
				}, 
				//style different elements on the map
				{ 
					featureType: "transit", 
					elementType: "geometry.fill", 
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}, 
				{
					featureType: "poi",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.government",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.sport_complex",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.attraction",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.business",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "transit",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "transit.station",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "landscape",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
					
				},
				{
					featureType: "road",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "road.highway",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}, 
				{
					featureType: "water",
					elementType: "geometry",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}
			];
				
			//set google map options
			var map_options = {
				center: new google.maps.LatLng(latitude, longitude),
				zoom: map_zoom,
				panControl: false,
				zoomControl: true,
				mapTypeControl: true,
				streetViewControl: true,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false,
				styles: style,
			}
			//inizialize the map
			var map = new google.maps.Map(document.getElementById('google-container'), map_options);
			//add a custom marker to the map				
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude, longitude),
				map: map,
				visible: true,
				icon: marker_url,
			});
		
		}, 1000);
        
        if(typeof gapi !== "undefined") {
            gapi.post.go();
        }

	
        
        $scope.currentHotelMap= $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBwFDofYVj2wDbbrdZl1_Bossxi-_hdlhU&q="+$scope.currentHotel.geoLocation.latitude+","+$scope.currentHotel.geoLocation.longitude);
        $scope.hideResults = false;
        $scope.showDetail = true;
        document.getElementById("buscadorbox").scrollIntoView();
        
		document.getElementById("buscadorbox").scrollIntoView();
    };
    $scope.agregarYRegresar = function() {
    	notify('Hotel agregado a Mi Selección');
        $scope.showSearch = false;
        $scope.hideResults = true;
        $scope.showDetail = false;
        $scope.hotelesSeleccionados.push($scope.currentHotel);
        //sliderBars.slidebars.toggle('left');
        document.getElementById("buscadorbox").scrollIntoView();
        window.localStorage.setItem('hotelesSeleccionados',JSON.stringify($scope.hotelesSeleccionados));
    };

    $scope.existeEnSeleccion = function(hotel){
    	if(hotel==null)return;
        for(var i=0;i<$scope.hotelesSeleccionados.length;i++){
            if(hotel.id == $scope.hotelesSeleccionados[i].id){
                return i;
            };

        };
        return -1;
    }; 

    $scope.deleteSelection = function(hotel){
        $scope.hotelesSeleccionados.splice($scope.existeEnSeleccion(hotel),1);
         window.localStorage.setItem('hotelesSeleccionados',JSON.stringify($scope.hotelesSeleccionados));
    };



    // gives another movie array on change
    $scope.updateMovies = function(typed){
        // MovieRetriever could be some service returning a promise
        if(typed.length==0){
        	$scope.movies  =  [];
        	return;
        }
        if(typed.length<4)return;
        $http.get(server+"/search/cities/"+typed).success(function(data){
            $scope.movies  =  [];
            if(data.autocomplete == null)return;
            for(var i=0;i<data.autocomplete.length;i++){
                //if(data.autocomplete[i].type=="city"
                	console.log(data.autocomplete);
                    $scope.movies.push(data.autocomplete[i].id+" "+data.autocomplete[i].name);
            }

        });

    };

    $scope.muestraCuadritos = function(){
    	if($scope.fechaInicialFor && !$scope.fechaFinalFor){
			//$scope.fechaFinalFor = $scope.fechaInicialFor;
			
			pickerFin.gotoDate(pickerIni.getDate());
		}
        else if($scope.fechaInicialFor && $scope.fechaFinalFor){
            $scope.rfp.fechaInicial = parseDate($scope.fechaInicialFor);
            $scope.rfp.fechaFinal = parseDate($scope.fechaFinalFor);
            var totalDias = parseInt(($scope.rfp.fechaFinal.getTime() - $scope.rfp.fechaInicial.getTime())/86400000);
            $scope.configuracionHabitacionesSencillas = [];
            $scope.configuracionHabitacionesDobles = [];
            console.log("Total dias");
            console.log(totalDias);
            for(var i=0;i<totalDias;i++){
                $scope.configuracionHabitacionesSencillas.push({tipoHabitacion:1,fecha:moment($scope.rfp.fechaInicial).add(i,'day').toDate()});
                $scope.configuracionHabitacionesDobles.push({tipoHabitacion:2,fecha:moment($scope.rfp.fechaInicial).add(i,'day').toDate()});

            };

        }


    };

    $scope.validarDatosEvento = function(){
        if($scope.rfp.fechaInicial == null || $scope.rfp.fechaFinal == null){
            alert("Las fechas son obligatorias.");
            return;
        }if($scope.rfp.fechaFinal.getTime() < $scope.rfp.fechaInicial.getTime()){
            alert("La fecha final no puede ser menor a la fecha inicial."); 
            return;
        }
        rfp.fechaInicial = $scope.rfp.fechaInicial;
        rfp.fechaFinal = $scope.rfp.fechaFinal;
         $scope.rfp.configuracionHabitaciones = $scope.configuracionHabitacionesSencillas.concat($scope.configuracionHabitacionesDobles);
         setDatePickersEvt($scope.rfp.fechaInicial,$scope.rfp.fechaFinal)
        window.localStorage.setItem('rfp',JSON.stringify($scope.rfp));
        $.fancybox.next();

    };

    $scope.validarDatosSalones = function(){
        
        for(var i in $scope.rfp.salones){
        	$scope.rfp.salones[i].fecha = parseDate($scope.rfp.salones[i].fechaStr);
        }
        window.localStorage.setItem('rfp',JSON.stringify($scope.rfp));
        $.fancybox.next();
    };

    $scope.rfp_create = function(){
        if($scope.hotelesSeleccionados.length<1){
            alert("No has seleccionado ningún Hotel","error");
            return;
        }

       
        $scope.rfp.recintos = [];
        for(var i = 0; i<$scope.hotelesSeleccionados.length;i++){
            $scope.rfp.recintos.push(
                {id:$scope.hotelesSeleccionados[i].id,
                 name:$scope.hotelesSeleccionados[i].name,
                 description:$scope.hotelesSeleccionados[i].description,
                 address:$scope.hotelesSeleccionados[i].address.fullAddress,
                 postalCode:$scope.hotelesSeleccionados[i].address.postalCode,
                 countryId:$scope.hotelesSeleccionados[i].countryId,
                 cityId:$scope.hotelesSeleccionados[i].cityId }); 
        };


        console.log(angular.toJson( $scope.rfp));
        $http.post(server+'/RFP',$scope.rfp).success(function(data){
            $scope.folioFinal = ""+data.id;
            $scope.rfp = null;
            $scope.rfp = {};

            $scope.hotelesSeleccionados = null;
            $scope.hotelesSeleccionados = [];

            $scope.configuracionHabitacionesDobles = [];
            $scope.configuracionHabitacionesSencillas = [];
            $scope.fechaInicialFor = null;
            $scope.fechaFinalFor = null;
            window.localStorage.removeItem('rfp');
            window.localStorage.removeItem('hotelesSeleccionados');

            $.fancybox.next();
        }).error(function(data){
            console.log(data);
        });

    };

    $scope.logResume = function(){
        console.log($scope.rfp);

    };

    $scope.inicio = function(){
    	$scope.showIndex = true;
            $scope.showSearch = false;
            $scope.hideResults = false;
            $scope.showDetail = false;
            $scope.showLoader = false;

            $scope.searchClass = "buscadorIni";
    		$scope.footerClass = "footerIni";
    }

    //$scope.salonesModificados = [];
    $scope.agregarEventoSalon = function(){
    	if($scope.rfp.salones==null){
    		$scope.rfp.salones = []
    	}
    	var newObj = {};

    	newObj.fechaStr = moment($scope.rfp.fechaInicial).format('DD-MM-YYYY')
    	$scope.rfp.salones.push(newObj);
    	//$scope.salonesModificados.push($scope.rfp.salones.length-1);
    	$timeout(function(){$scope.refrescarSalones($scope.rfp.salones.length-1)}, 300);
    	//$timeout(setDatePickers(),333)
    }

    $scope.clonarSalon = function(salon){
		$scope.rfp.salones.push(angular.copy(salon));
		$timeout(function(){$scope.refrescarSalones($scope.rfp.salones.length-1)}, 300);
    }

    $scope.eliminarSalon = function(salon){
    	for(var i in $scope.rfp.salones){
    		if($scope.rfp.salones[i]==salon){
    			$scope.rfp.salones.splice(i,1);
    			return;
    		}
    	}
    }

   
    $scope.refrescarSalones = function(idx){
    	
    		console.log(idx);
    		$('.rfp_salon_horaInicio'+idx).timepicker({ 'scrollDefault': 'now',"step":30,'timeFormat': 'H:i' });
    		$('.rfp_salon_horaFin'+idx).timepicker({ 'scrollDefault': 'now',"step":30,'timeFormat': 'H:i' });

    		
	 		//$(".rfp_salon_horaFin0").timepicker({ 'scrollDefault': 'now',"step":30,'timeFormat': 'H:i' });
    		
    		$("#selectConfigSalon"+idx).selectator({
				showAllOptionsOnFocus: true,
				labels: {
					search: 'Buscar...'
				}
			});

			$("#selectConfigTipo"+idx).selectator({
				showAllOptionsOnFocus: true,
				labels: {
					search: 'Buscar...'
				}
			});

    		setDatePickersEvt($scope.rfp.fechaInicial,$scope.rfp.fechaFinal)
			bindAccordion()
    	


    	//$scope.salonesModificados = [];
    }
}]).directive('repeatDone', function() {
      return function(scope, element, attrs) {
          if (scope.$last) {
            scope.$eval(attrs.repeatDone);
          }
        
      }
    });