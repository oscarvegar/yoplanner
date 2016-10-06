angular.module('rfp-module', [])
.directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
})
.controller('RFPController', function($scope,$http,$rootScope,$timeout, Upload, notify) {
	$scope.init = function(){
	 	$scope.rfp =  window.localStorage.rfp!=null?JSON.parse(window.localStorage.rfp):{};
		console.log('RPF', $scope.rfp);
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

	//Cargar customers
	$scope.loadCustomers = function () {
		if ($rootScope._hasSession) {
			$http.get('/customer/getbyuser').success(function(data) {
        console.log('MY CUSTOMERS', data);
				$scope.myCustomers = data;
			});
		}
	};

	$scope.saveAttachments = function (attachments, id) {
		attachments.forEach(function (att) {
			console.log(att.tempfile);
			$http.post('/rfp/upload', {image: att.tempfile}).success(function(data) {
				console.log('UPLOAD ATT', data);
			}).error(function (err) {
				console.log(err);
			});
		});
	}

	$scope.uploadAttachment = function (desc, i) {
		if (!desc.tempfile) {
			return;
		}
		console.log(desc.title);
		Upload.upload({
      url: '/rfp/upload',
      data: {
        image: desc.tempfile
      }
    }).then(function(data) {
      notify('Descargable subido correctamnete.');
			console.log(data.data);
      $scope.rfp.attachments[i].url = data.data.url;
    }, function (err) {
      console.log(err);
      notify('Error al subir Descargable.');
    });
	}

	$scope.addAttachment = function () {
		if (!$scope.rfp.attachments) {
			$scope.rfp.attachments = [];
		}
		$scope.rfp.attachments.push({title: '', file: null});
	}

    $scope.muestraCuadritos = function(){
			//Cambiar fecha minima a la inicia
			$('#rfp_fechaFinal').datepicker('option', 'minDate', $scope.fechaInicialFor);

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
				//Limitar fechas de los eventos
				$('.datepickerEvt'+idx).datepicker('option', 'minDate', $scope.fechaInicialFor);
				$('.datepickerEvt'+idx).datepicker('option', 'maxDate', $scope.fechaFinalFor);

    		bindAccordion()
    }

     $scope.validarDatosSalones = function(){

        for(var i in $scope.rfp.salones){
        	$scope.rfp.salones[i].fecha = parseDate($scope.rfp.salones[i].fechaStr);
        }
        window.localStorage.setItem('rfp',JSON.stringify($scope.rfp));

        $.fancybox.next();
    };

		$scope.changeNombre = function (str) {
			$scope.rfp.nombreCliente = str;
		}

		$scope.$watch('selectedCustomer', function () {
			if (!$scope.selectedCustomer) {
				return;
			}
			$scope.rfp.nombreCliente = $scope.selectedCustomer.originalObject.nombreCliente;
			$scope.rfp.email = $scope.selectedCustomer.originalObject.email;
			$scope.rfp.telefonoContacto = $scope.selectedCustomer.originalObject.telefonoContacto;
			$scope.rfp.empresa = $scope.selectedCustomer.originalObject.empresa;
			$scope.rfp.puesto = $scope.selectedCustomer.originalObject.puesto;
			$scope.rfp.paisText = $scope.selectedCustomer.originalObject.paisText;
			$scope.rfp.estadoText = $scope.selectedCustomer.originalObject.estadoText;
			$scope.rfp.ciudadText = $scope.selectedCustomer.originalObject.ciudadText;
			$scope.rfp.customer = $scope.selectedCustomer.originalObject.id;
		});

		//Get hotel mail
		$scope.loadHotelEmail = function (id) {
			console.log('CARGANDO HOTEL', id);
			$http.post('/recinto/getHotelEmail', {id: id}).success(function(data) {
				$scope.rfp.emailhoteles[id] = data.email;
				console.log('Email cargado');
			});
		};

    $scope.rfp_create = function(){
        if($scope.hotelesSeleccionados.length<1){
            alert("No has seleccionado ningún Hotel","error");
            return;
        }

				//Crear customer si no existe
				var customerInList = false;
				for (var i in $scope.myCustomers) {
					if ($scope.myCustomers[i].nombreCliente == $scope.rfp.nombreCliente) {
						customerInList = true;
					}
				}
				if (!customerInList) {
					$http.post('/customer/addcustomer', {
						nombreCliente: $scope.rfp.nombreCliente,
						email: $scope.rfp.email,
						telefonoContacto: $scope.rfp.telefonoContacto,
						empresa: $scope.rfp.empresa,
						puesto: $scope.rfp.puesto,
						paisText: $scope.rfp.paisText,
						estadoText: $scope.rfp.estadoText,
						ciudadText: $scope.rfp.ciudadText
					}).success(function(data) {
						console.log('Customer Creado', data);
						//Añadir el customer al RFP
						$scope.rfp.customer = data.customer.id;
					}).error(function (err) {
						console.log(err);
					});
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

				//Cachear rfp
				var rfp_temp = $scope.rfp;
				//Enviar correo al planner
				$http.post('/rfp/sendPlannerMail', {
					rfp: rfp_temp,
					options: {
						subject: 'RFP Recibida ✔ | Planner'
					}
				}).success(function(data) {
					console.log(data);
				});

				//Enviar correo a Hoteles
				for (var hotel in $rootScope.hotelesSeleccionados) {
					$http.post('/rfp/sendHotelMail', {
						rfp: rfp_temp,
						options: {
							to: $rootScope.hotelesSeleccionados[hotel].email,
							subject: 'RFP Recibida ✔ | Hotel'
						}
					}).success(function(data) {
						console.log(data);
					});
				}


        //console.log(angular.toJson( $scope.rfp));
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
