angular.module('rfp-module', [])
.controller('RFPController', function($scope,$http,$rootScope,$timeout) {
	$scope.init = function(){
	 	$scope.rfp =  window.localStorage.rfp!=null?JSON.parse(window.localStorage.rfp):{};
	  	$scope.configuracionHabitacionesDobles = $scope.rfp.configuracionHabitaciones!=null?$scope.divideTipoHabitaciones(2,$scope.rfp.configuracionHabitaciones):[];
	    $scope.configuracionHabitacionesSencillas = $scope.rfp.configuracionHabitaciones!=null?$scope.divideTipoHabitaciones(1,$scope.rfp.configuracionHabitaciones):[];
	    $scope.fechaInicialFor = $scope.rfp.fechaInicial!=null?moment($scope.rfp.fechaInicial).format('YYYY-MM-DD'):null;
	    $scope.fechaFinalFor = $scope.rfp.fechaFinal!=null?moment($scope.rfp.fechaFinal).format('YYYY-MM-DD'):null;
	    if($scope.rfp.fechaInicial!=null){
	    	$scope.rfp.fechaInicial = parseDate($scope.fechaInicialFor);
	    	$scope.rfp.fechaFinal = parseDate($scope.fechaFinalFor);
	    }
	}


   
	$rootScope.mostrarRFP = function(){
		$.fancybox([
 	        	{href : '#rfp_view', title : 'Datos Generales'},
	        	{href : '#salones_view', title : 'Mis Eventos'},
	        	//{href : '#rfp_seleccion', title : 'Mi Selección'},
	        	{href : '#datos_contacto', title : 'Contacto'},
	        	{href : '#gracias', title : 'Gracias'}
	        	//{href : '#rfp_resumen', tinewObjtle : 'Resumen'},
	        ],{
			arrows: false,
			fitToView	: true,
            margin      : 80,
			width		: '820px',
			height		: '600px',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
			});
	}


    $scope.muestraCuadritos = function(){
    	console.log("muestra cuadritos")
    	if($scope.fechaInicialFor && !$scope.fechaFinalFor){
			$scope.fechaFinalFor = $scope.fechaInicialFor;
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
    }


	 $scope.validarDatosEvento = function(){
        if($scope.rfp.fechaInicial == null || $scope.rfp.fechaFinal == null){
            alert("Las fechas son obligatorias.");
            return;
        }if($scope.rfp.fechaFinal.getTime() < $scope.rfp.fechaInicial.getTime()){
            alert("La fecha final no puede ser menor a la fecha inicial."); 
            return;
        }
        $scope.rfp.configuracionHabitaciones = $scope.configuracionHabitacionesSencillas.concat($scope.configuracionHabitacionesDobles);
        window.localStorage.setItem('rfp',JSON.stringify($scope.rfp));
        bindAccordion();
        if($scope.rfp.needSal)
            $.fancybox.next();
        else{
             $.fancybox.next();
             $.fancybox.next();
        }
           
        
    };

    $scope.agregarEventoSalon = function(){
    	if($scope.rfp.salones==null){
    		$scope.rfp.salones = []
    	}
    	var newObj = {};

    	newObj.fechaStr = $scope.fechaInicialFor+"";
    	$scope.rfp.salones.push(newObj);
    	$timeout(function(){$scope.refrescarSalones($scope.rfp.salones.length-1)}, 300);
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
    		$('.datepickerEvt'+idx).datepicker({ dateFormat: 'yy-mm-dd' }); 
    		$('.rfp_salon_horaInicio'+idx).timepicker({ 'scrollDefault': 'now',"step":30,'timeFormat': 'H:i' });
    		$('.rfp_salon_horaFin'+idx).timepicker({ 'scrollDefault': 'now',"step":30,'timeFormat': 'H:i' });
		    
    		bindAccordion()
    }

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
        $http.post('/RFP/crear',$scope.rfp).success(function(data){
            $scope.folioFinal = ""+data.id;
            $scope.rfp = null;
            $scope.rfp = {};

            $scope.hotelesSeleccionados = null;
            $scope.hotelesSeleccionados = [];
            $rootScope.hotelesSeleccionados = null;
            $rootScope.hotelesSeleccionados = [];

            $scope.configuracionHabitacionesDobles = [];
            $scope.configuracionHabitacionesSencillas = [];
            $scope.fechaInicialFor = null;
            $scope.fechaFinalFor = null;
            window.localStorage.removeItem('rfp');
            window.localStorage.removeItem('hotelesSeleccionados');
            window.localStorage.removeItem('ngStorage-hotelesSeleccionados');

            $.fancybox.next();
        }).error(function(data){
            console.log(data);
        });

    };



    $(".date-input-rfp").datepicker({ dateFormat: 'yy-mm-dd', minDate: new Date() });

    $scope.divideTipoHabitaciones = function(tipo,arre){
    	var res = [];
    	for(i in arre){
    		if(arre[i].tipoHabitacion==tipo)
    			res.push(arre[i]);
    	}
    	return res;
    }

    $scope.regresarDatos = function(){
        if($scope.rfp.needSal)$.fancybox.prev();else{$.fancybox.prev();$.fancybox.prev();}
    }


  

	$scope.init();
    
})
.directive('rfp', function() {
	return {
        restrict: 'E',
        templateUrl: '/ng/modules/rfp.html'
    };
}).config(function(){
	
});