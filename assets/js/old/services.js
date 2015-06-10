
function rfp_create(){
	var errors = [];
	if(!rfp.nombreCliente || !rfp.nombreCliente.trim().length){
		errors.push("Nombre de cliente es obligatorio");
	}
	if(!rfp.telefonoContacto || !rfp.telefonoContacto.trim().length){
		errors.push("Telefono de contacto es obligatorio");
	}
	if(!rfp.email || !rfp.email.trim().length) {
		errors.push("Email es obligatorio");
	}
	if(!rfp.empresa || !rfp.empresa.trim().length){
		errors.push("Empresa es obligatorio");
	}
	if(!rfp.puesto || !rfp.puesto.trim().length){
		errors.push("Cargo es obligatorio");
	}
	if(errors.length>0){
		alert(errors,"error");
		return;
	}
	$.ajax({
		  url: "../rfp/create",
		  type: "POST",
		  contentType: "application/json",
		  data: JSON.stringify(rfp)
		}).success(function(response) {
		  $("#folioRFP").html(response.id);
		  $.fancybox.next();
		}).error(function(error){
			alert("Ha ocurrido un error, verifica tu cotización para poder continuar.");
		});
}