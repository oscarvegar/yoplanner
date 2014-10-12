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

function alert(text,tipo){
	if(tipo == "info" || tipo == null){
		$("#box_icon").attr('src',"../img/icon/notice.png");
	}else if(tipo == "error"){
		$("#box_icon").attr('src',"../img/icon/error.png");
	}else if(tipo == "warn"){
		$("#box_icon").src="../img/icon/warning.png";
	}else if(tipo == "success"){
		$("#box_icon").src="../img/icon/success.png";
	}
	$("#box_messages").html("");
	if(text instanceof Array){
		for(var i=0;i<text.length;i++){
			$("#box_messages").append("<li>"+text[i]+"</li>");
		}
	}else
		$("#box_messages").append("<li>"+text+"</li>");
	$('#box').bounceBoxShow();
	setTimeout(function() { $('#box').bounceBoxHide(); }, 2000);

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

function showCotizar(){
	$.fancybox([
 	        	{href : '#rfp_view', title : 'Datos Generales'},
	        	{href : '#salones_view', title : 'Mis Eventos'},
	        	{href : '#rfp_seleccion', title : 'Mi Selección'},
	        	{href : '#datos_contacto', title : 'Contacto'},
	        	{href : '#gracias', title : 'Eventos'},
	        	{href : '#rfp_resumen', title : 'Resumen'},
	        ],{
arrows: false,
fitToView	: true,
width		: '700px',
height		: '500px',
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
	 $newTab.find("#rfp_salon_horaInicio").timepicker({ 'scrollDefault': 'now',"step":30,'timeFormat': 'H:i' });
	 $newTab.find("#rfp_salon_horaFin").timepicker({ 'scrollDefault': 'now',"step":30,'timeFormat': 'H:i' });
	var $slcConf = $("#tmpSlcConfigSalon").find("#selectConfig").clone();
	$newTab.find("#tdConfSalon").append($slcConf);
	$newTab.find("#tdConfSalon").find("#selectConfig").selectator({
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

function eliminarEvento($evento){
	var delSalon = $evento.next().next().data("salon");
	for(var i=0;i<rfp.salones.length;i++){
		if(delSalon == rfp.salones[i])
			rfp.salones.splice( i, 1 );
	}
	$evento.parent().remove();
}

function clonarEvento($evento){
	

	var $newTab = $evento.parent().clone();
	
	var $acHeader = $newTab.find(".accordion-header");
	
	//var $currSServ = $newTab.find("#tdServicios").find("#selectator_selectServicios");
	
	/*$newTab.find("#tdServicios").find("#selectServicios").selectator({
		chosenItems: [1,2],
		showAllOptionsOnFocus: true,
		labels: {
			search: 'Buscar...'
		}
	});

	$currSServ.remove();*/
	
	$newTab.find("#tdConfSalon").find("#selectator_selectConfig").remove();
	$newTab.find("#tdConfSalon").find("#selectConfig").val($evento.parent().find("#selectConfig").val());
	$newTab.find("#tdConfSalon").find("#selectConfig").selectator({
		showAllOptionsOnFocus: true,
		labels: {
			search: 'Buscar...'
		}
	});
	 $newTab.find("#rfp_tipoEvento").val($evento.parent().find("#rfp_tipoEvento").val());
	 $newTab.find("#rfp_salon_horaInicio").val($evento.parent().find("#rfp_salon_horaInicio").val());
	 $newTab.find("#rfp_salon_horaInicio") .timepicker({"step":30,'timeFormat': 'H:i' });
	 $newTab.find("#rfp_salon_horaFin").val($evento.parent().find("#rfp_salon_horaFin").val());
	 $newTab.find("#rfp_salon_horaFin") .timepicker({"step":30,'timeFormat': 'H:i' });
	 $newTab.find("#rfp_salon_comadicionales").val($evento.parent().find("#rfp_salon_comadicionales").val());
	

	currentSalon = JSON.parse(JSON.stringify(currentSalon));
	currentSalon.fecha = parseDate($newTab.find("#rfp_salon_fecha").val());
	$acHeader.data("salon",currentSalon); 
	$("#accordion-container").append($newTab);
	rfp.salones.push(currentSalon);
	bindAccordion();

	setDatePickers();

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



