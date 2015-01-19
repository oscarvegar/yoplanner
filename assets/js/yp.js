var rfp={};
rfp.salones = [];
rfp.configuracionHabitaciones = [];
var currentSalon;
var tiposSalon = {};
var sliderBars;

function parseDate(date){
	return moment(date, "DD-MM-YYYY").toDate();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
function checkCookie(cname) {
    var cookie=getCookie(cname);
    if (cookie!="") {
        return true;
    }
    return false;
}




$(document).ready(function(){
	//init if rfp exists
	for (var property in rfp) {
	    if (rfp.hasOwnProperty(property)) {
	    	if($("#rfp_"+property))
	    		$("#rfp_"+property).val(rfp[property]);
	    	if(property == "salones"){
	    		var $newSalon = $("#rfp_salones").clone();
	    		var $newTipoTmp = $newSalon.find("#rfp_salones_tipo_id").clone();
	    		$newSalon.empty();
	    		for(var i = 0;i<tiposSalon.length;i++){
	    			var $newTipo = $newTipoTmp.clone();
		    		var tipoSalon = tiposSalon[i];
		    		$newTipo.value=tipoSalon.id;
		    		$newSalon.append($newTipo);
		    		$newSalon.append(tipoSalon.nombre); 
		    		$("#rfp_salones_sec").append($newSalon);
	    		}
	    	}
	    }
	}
	
	startbindAccordion();
	sliderBars = new $.slidebars();
	//$('.clockpicker').clockpicker();
	
	setDatePickers();
	/* Converting the #box div into a bounceBox: */
    $('#box').bounceBox();
    $('#box').click(function(){
        $('#box').bounceBoxHide();
    });
  
    
});	


function setDatePickers(){
	var dat = new Date();
    dat.setDate(dat.getDate() + 1);
   
	$('.datepicker').pikaday({ 
		format: 'DD-MM-YYYY',
		minDate:  dat,
		i18n: {
            previousMonth : 'Mes Anterior',
            nextMonth     : 'Mes Siguiente',
            months        : ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            weekdays      : ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
            weekdaysShort : ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
        }
			
	});
}
function setDatePickersEvt(min,max){
	var dat = new Date();
    dat.setDate(dat.getDate() + 1);
   
	$('.datepickerEvt').pikaday({ 
		format: 'DD-MM-YYYY',
		minDate:  min,
		maxDate:  max,
		i18n: {
            previousMonth : 'Mes Anterior',
            nextMonth     : 'Mes Siguiente',
            months        : ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            weekdays      : ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
            weekdaysShort : ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
        }
			
	});
}

function setTimePickers(clase){
	var dat = new Date();
    dat.setDate(dat.getDate() + 1);
   
	$('.datepicker').pikaday({ 
		format: 'DD-MM-YYYY',
		minDate:  dat,
		i18n: {
            previousMonth : 'Mes Anterior',
            nextMonth     : 'Mes Siguiente',
            months        : ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
            weekdays      : ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
            weekdaysShort : ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
        }
			
	});
}

function showCotizar(){
    setDatePickers();
	$.fancybox([
 	        	{href : '#rfp_view', title : 'Datos Generales'},
	        	{href : '#salones_view', title : 'Mis Eventos'},
	        	//{href : '#rfp_seleccion', title : 'Mi Selección'},
	        	{href : '#datos_contacto', title : 'Contacto'},
	        	{href : '#gracias', title : 'Gracias'}
	        	//{href : '#rfp_resumen', title : 'Resumen'},
	        ],{
arrows: false,
fitToView	: true,
width		: '800px',
height		: '600px',
autoSize	: false,
closeClick	: false,
openEffect	: 'none',
closeEffect	: 'none'
});
}

function agregarSalon(){
	var $newTab = $("#newSalon").clone();
	$newTab.css('display','inline'); 
	var $acHeader = $newTab.find(".accordion-header");
	
	$acHeader.html("Nuevo Salon");
		
	
	var $newSalon = $newTab.find("#rfp_salones").clone();
	$newSalon.empty();
	/*var $slcServ = $("#tmpSlcServicios").find("#selectServicios").clone();
	$newTab.find("#tdServicios").append($slcServ);
	$newTab.find("#tdServicios").find("#selectServicios").selectator({
		showAllOptionsOnFocus: true,
		labels: {
			search: 'Buscar...'
		}
	});*/
	$newTab.find("#rfp_tipoEvento").val(1);
	 
	var $slcConf = $("#tmpSlcConfigSalon").find("#selectConfigSalon").clone();
	var $slcConfTip = $("#tmpSlcConfigTipo").find("#selectConfigTipo").clone();
	$newTab.find("#tdConfSalon").append($slcConf);
	$newTab.find("#tdConfSalon").find("#selectConfigSalon").selectator({
		showAllOptionsOnFocus: true,
		labels: {
			search: 'Buscar...'
		}
	});
	$newTab.find("#tdConfTipo").append($slcConfTip);
	$newTab.find("#tdConfTipo").find("#selectConfigTipo").selectator({
		showAllOptionsOnFocus: true,
		labels: {
			search: 'Buscar...'
		}
	});

	currentSalon = {tipoSalon:{},tipoEvento:{}};
	$acHeader.data("salon",currentSalon); 
	$("#accordion-container").append($newTab);
	rfp.salones.push(currentSalon);
	bindAccordion();
	setDatePickers();

	
};

function armaServicios(seleccion){
	servicios = [];
	if(seleccion == null)
		return servicios;
	for(var i=0;i<seleccion.length;i++){
		servicios.push({id:seleccion[i]});
	}
	return servicios;
}





function validarDatosEvento(){
	if(rfp.fechaInicial == null || rfp.fechaFinal == null){
		alert("Las fechas son obligatorias.","error");
		return;
	}if(rfp.fechaFinal.getTime() < rfp.fechaInicial.getTime()){
		alert("La fecha final no puede ser menor a la fecha inicial.","error"); 
		return;
	}
	$.fancybox.next();
}
function validarDatosSalones(){
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
	
	$.fancybox.next();
}


var editingDate = 0;
function muestraCuadritos(lg){
	if(editingDate === 1)
		return;
	console.log(lg);
	if(rfp.fechaInicial && rfp.fechaFinal){
		var totalDias = parseInt((rfp.fechaFinal.getTime() - rfp.fechaInicial.getTime())/86400000);
		var $newInputSen,$newInputDob;
		var newSen,newDob;
		for(var im=0; im<totalDias;im++){
			var currDate = new Date(rfp.fechaInicial.getTime()+(86400000*(im)));
			$("#cuadritosSencillasHead").append("<td style='text-align:center; '>"+currDate.getDate()+"</td>");
			$("#cuadritosDoblesHead").append("<td style='text-align:center; '>"+currDate.getDate()+"</td>");
			var currDate = new Date(rfp.fechaInicial.getTime()+(86400000*(im)));
			newSen = {habitaciones:0,tipoHabitacion:0,fecha:currDate};
			newDob = {habitaciones:0,tipoHabitacion:1,fecha:currDate};
			rfp.configuracionHabitaciones.push(newSen);
			rfp.configuracionHabitaciones.push(newDob) ;
			
			$newInputSen = document.createElement('input');
			$newInputSen.type="text";
			$newInputSen.value=0;
			$newInputSen.data=newSen;
			$newInputSen.size=1;
			$newInputSen.onblur = function(){
				this.data.habitaciones = this.value;
			};
			var $loc = document.createElement("th");
			$loc.appendChild($newInputSen);
			$("#cuadritosSencillas").append($loc);
			
			
			$newInputDob = document.createElement('input');
			$newInputDob.type="text";
			$newInputDob.value=0;
			$newInputDob.data=newDob;
			$newInputDob.size=1;
			$newInputDob.onblur = function(){
				this.data.habitaciones = this.value;
			};
			var $loc2 = document.createElement("th");
			$loc2.appendChild($newInputDob);
			$("#cuadritosDobles").append($loc2);
		}
	}
	editingDate = 1;
}



