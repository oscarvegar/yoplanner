var server = "http://mitianguis.mx:1337";
angular.module('yoPlannerApp', ['autocomplete','angular-flexslider','yp-index','yp-hoteles','yp-rfp'])
.controller('RecintosController', ["$scope","$http","$sce","$filter",function($scope,$http,$sce,$filter) {
    $scope.showSearch = true;
    $scope.hideResults = false;
    $scope.showDetail = false;
    $scope.searchString = null;
    $scope.searchId = null;
    $scope.lastSearchId = null;
    $scope.currentHotel = null;
    $scope.currentHotelMap = null;
    $scope.hotelesSeleccionados = [];
    $scope.showLoader = false;
    $scope.rfp = {};
    $scope.configuracionHabitacionesDobles = [];
    $scope.configuracionHabitacionesSencillas = [];
    $scope.fechaInicialFor = null;
    $scope.fechaFinalFor = null;
    $scope.folioFinal = null;
    $scope.showIndex = true;
    $scope.showMostrarMas = false;
    //pruebas
    $scope.rfp.paisText = "México";
    $scope.rfp.nombreCliente = "oscar";
    $scope.rfp.email = "osc@fo.com";
    $scope.rfp.telefonoContacto = "5544556677";
    $scope.currentPage = 0;
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
            document.getElementById("topContent").scrollIntoView();
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
        
            document.getElementById("topContent").scrollIntoView();

    };


    $scope.selectResult = function(hotel) {
		$scope.currentHotel = hotel;
		
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
				zoomControl: false,
				mapTypeControl: false,
				streetViewControl: false,
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
		
		gapi.post.go();

	
        
        $scope.currentHotelMap= $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyBwFDofYVj2wDbbrdZl1_Bossxi-_hdlhU&q="+$scope.currentHotel.geoLocation.latitude+","+$scope.currentHotel.geoLocation.longitude);
        $scope.hideResults = false;
        $scope.showDetail = true;
        document.getElementById("topContent").scrollIntoView();
        
    };
    $scope.agregarYRegresar = function() {
        $scope.showSearch = false;
        $scope.hideResults = true;
        $scope.showDetail = false;
        $scope.hotelesSeleccionados.push($scope.currentHotel);
        //sliderBars.slidebars.toggle('left');
        document.getElementById("topContent").scrollIntoView();
    };

    $scope.existeEnSeleccion = function(hotel){
        for(var i=0;i<$scope.hotelesSeleccionados.length;i++){
            if(hotel.id == $scope.hotelesSeleccionados[i].id){
                return i;
            };

        };
        return -1;
    }; 

    $scope.deleteSelection = function(hotel){
        $scope.hotelesSeleccionados.splice($scope.existeEnSeleccion(hotel),1);
    };



    // gives another movie array on change
    $scope.updateMovies = function(typed){
        // MovieRetriever could be some service returning a promise
        if(typed.length<4)return;
        $http.get(server+"/search/cities/"+typed).success(function(data){
            $scope.movies  =  [];
            if(data.autocomplete == null)return;
            for(var i=0;i<data.autocomplete.length;i++){
                if(data.autocomplete[i].type=="city")
                    $scope.movies.push(data.autocomplete[i].id+" "+data.autocomplete[i].name);
            }

        });

    };

    $scope.muestraCuadritos = function(){
        if($scope.fechaInicialFor && $scope.fechaFinalFor){
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
            alert("Las fechas son obligatorias.","error");
            return;
        }if($scope.rfp.fechaFinal.getTime() < $scope.rfp.fechaInicial.getTime()){
            alert("La fecha final no puede ser menor a la fecha inicial.","error"); 
            return;
        }
        rfp.fechaInicial = $scope.rfp.fechaInicial;
        rfp.fechaFinal = $scope.rfp.fechaFinal;
        $.fancybox.next();

    };

    $scope.validarDatosSalones = function(){
        for(var i=0;i<rfp.salones.length;i++){
            var salon = rfp.salones[i];
            if(salon.fecha.getTime() < rfp.fechaInicial.getTime()){
                alert("La fecha para el salón no puede ser menor a la fecha de entrada","error");
                return;
            }
            if(salon.fecha.getTime() > rfp.fechaFinal.getTime()){
                alert("La fecha para el salón no puede ser mayor a la fecha de salida.","error");
                return;
            }
        }
        $scope.rfp.salones = rfp.salones;
        console.log($scope.rfp.salones);
        $.fancybox.next();
    };

    $scope.rfp_create = function(){
        if($scope.hotelesSeleccionados.length<1){
            alert("No has seleccionado ningún Hotel","error");
            return;
        }

        $scope.rfp.configuracionHabitaciones = $scope.configuracionHabitacionesSencillas.concat($scope.configuracionHabitacionesDobles);

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


            $.fancybox.next();
        }).error(function(data){
            console.log(data);
        });

    };

    $scope.logResume = function(){
        console.log($scope.rfp);

    };




}]);